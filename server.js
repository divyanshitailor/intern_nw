require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Multer Upload Middleware Import
const upload = require('./middleware/upload');

// Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'rentnest_db',
  port: process.env.DB_PORT || 3306
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Database connected successfully!');
});

// JWT Secret Key Dynamic Setup
const JWT_SECRET = process.env.JWT_SECRET || 'rentnest_secret_key';

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Access denied. No token provided.'
    });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

// ==========================================
// AUTH ROUTES
// ==========================================

// REGISTER ROUTE
app.post(['/api/register', '/api/auth/register'], (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('Register Query Error:', err);
        return res.status(500).json({ message: 'Database error during registration check.' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'Email already registered.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userRole = role === 'owner' ? 'owner' : 'tenant';

      const insertQuery = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
      db.query(insertQuery, [name, email, hashedPassword, userRole], (insertErr, result) => {
        if (insertErr) {
          console.error('Insert User Error:', insertErr);
          return res.status(500).json({ message: 'Failed to create account.' });
        }
        res.status(201).json({ message: 'Registration successful!' });
      });
    });
  } catch (error) {
    console.error('Bcrypt Error:', error);
    res.status(500).json({ message: 'Server error during hashing.' });
  }
});

// LOGIN ROUTE
app.post(['/api/login', '/api/auth/login'], (req, res) => { 
    const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Login Query Error:', err);
      return res.status(500).json({ message: 'Database error during login.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = results[0];

    try {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (bcryptErr) {
      console.error('Password Compare Error:', bcryptErr);
      res.status(500).json({ message: 'Authentication error.' });
    }
  });
});

// ==========================================
// PROPERTY ROUTES
// ==========================================

// GET ALL PROPERTIES
app.get('/api/properties', (req, res) => {
  const { city, property_type } = req.query;

  let sql = 'SELECT * FROM properties WHERE 1=1';
  const queryParams = [];

  if (city) {
    sql += ' AND city = ?';
    queryParams.push(city);
  }

  if (property_type) {
    sql += ' AND property_type = ?';
    queryParams.push(property_type);
  }

  sql += ' ORDER BY created_at DESC';

  db.query(sql, queryParams, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    const formattedProperties = results.map(prop => ({
      ...prop,
      amenities: typeof prop.amenities === 'string'
        ? JSON.parse(prop.amenities)
        : prop.amenities,
      images: typeof prop.images === 'string'
        ? JSON.parse(prop.images)
        : prop.images
    }));

    res.json({
      properties: formattedProperties,
      success: true,
      data: formattedProperties
    }); 
   });
});

// GET ONE PROPERTY
app.get('/api/properties/:id', (req, res) => {
  const propertyId = req.params.id;
  const sql = 'SELECT * FROM properties WHERE id = ?';

  db.query(sql, [propertyId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: 'Property not found'
      });
    }

    const prop = results[0];

    prop.amenities = typeof prop.amenities === 'string'
      ? JSON.parse(prop.amenities)
      : prop.amenities;

    prop.images = typeof prop.images === 'string'
      ? JSON.parse(prop.images)
      : prop.images;

    res.json({ property: prop });
  });
});

// ADD PROPERTY (OWNER ONLY - FIXED MULTER & FIELD HANDLING)
app.post('/api/properties', verifyToken, (req, res, next) => {
  // Check if upload middleware exists and handles images
  if (typeof upload.array === 'function') {
    return upload.array('images', 5)(req, res, next);
  } else if (typeof upload === 'function') {
    return upload(req, res, next);
  }
  next();
}, (req, res) => {
  if (req.user.role !== 'owner') {
    return res.status(403).json({
      message: 'Only property owners can add properties'
    });
  }

  const {
    title, description, price, rent, city, address,
    property_type, bhk, bedrooms, area_sqft, area
  } = req.body;

  const owner_id = req.user.id;
  const finalPrice = price || rent || 0;
  const finalBHK = bhk || bedrooms || null;
  const finalArea = area_sqft || area || null;

  let amenitiesArr = [];
  try {
    if (req.body.amenities) {
      amenitiesArr = typeof req.body.amenities === 'string'
        ? JSON.parse(req.body.amenities)
        : req.body.amenities;
    }
  } catch (error) {
    amenitiesArr = typeof req.body.amenities === 'string'
      ? req.body.amenities.split(',').map(a => a.trim())
      : [];
  }

  const imagePaths = req.files && req.files.length > 0
    ? req.files.map(file => `/uploads/${file.filename}`)
    : [];

  const sql = `
    INSERT INTO properties
    (owner_id, title, description, price, city, address,
     property_type, bhk, area_sqft, amenities, images)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    owner_id, title, description, finalPrice, city, address,
    property_type, finalBHK, finalArea,
    JSON.stringify(amenitiesArr),
    JSON.stringify(imagePaths)
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ SQL INSERT ERROR:', err);
      return res.status(500).json({
        message: 'Error saving property to database',
        error: err.message
      });
    }

    res.status(201).json({
      message: 'Property listed successfully!',
      propertyId: result.insertId
    });
  });
});

// DELETE PROPERTY (OWNER ONLY)
app.delete('/api/properties/:id', verifyToken, (req, res) => {
  const propertyId = req.params.id;
  const ownerId = req.user.id;

  const sql = `
    DELETE FROM properties
    WHERE id = ? AND owner_id = ?
  `;

  db.query(sql, [propertyId, ownerId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(403).json({
        message: 'Not authorized to delete this property'
      });
    }

    res.json({ message: 'Property deleted successfully!' });
  });
});

// UPDATE PROPERTY (OWNER ONLY)
app.put('/api/properties/:id', verifyToken, (req, res) => {
  const propertyId = req.params.id;
  const ownerId = req.user.id;

  const {
    title, description, price, city, address,
    property_type, bhk, area_sqft
  } = req.body;

  const sql = `
    UPDATE properties
    SET title=?, description=?, price=?, city=?, address=?,
        property_type=?, bhk=?, area_sqft=?
    WHERE id=? AND owner_id=?
  `;

  const values = [
    title, description, price, city, address,
    property_type, bhk, area_sqft, propertyId, ownerId
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(403).json({
        message: 'Not authorized to edit this property'
      });
    }

    res.json({ message: 'Property updated successfully!' });
  });
});

// ==========================================
// TENANT & WISHLIST ROUTES
// ==========================================

// SAVE PROPERTY (TENANT ONLY)
app.post('/api/saved/:propertyId/save', verifyToken, (req, res) => {
  if (req.user.role !== 'tenant') {
    return res.status(403).json({
      message: 'Only tenants can save properties'
    });
  }

  const tenant_id = req.user.id;
  const property_id = req.params.propertyId;

  const sql = `
    INSERT INTO saved_properties (user_id, property_id)
    VALUES (?, ?)
  `;

  db.query(sql, [tenant_id, property_id], (err) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({
          message: 'Property already saved'
        });
      }

      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.json({ message: 'Property saved successfully' });
  });
});

// REMOVE SAVED PROPERTY
app.delete('/api/saved/:id', verifyToken, (req, res) => {
  if (req.user.role !== 'tenant') {
    return res.status(403).json({
      message: 'Only tenants can remove saved properties'
    });
  }

  const savedId = req.params.id;
  const tenantId = req.user.id;

  const sql = `
    DELETE FROM saved_properties
    WHERE saved_id = ? AND user_id = ?
  `;

  db.query(sql, [savedId, tenantId], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.json({ message: 'Property removed from wishlist' });
  });
});

// GET SAVED PROPERTIES (TENANT ONLY)
app.get('/api/saved', verifyToken, (req, res) => {
  if (req.user.role !== 'tenant') {
    return res.status(403).json({
      message: 'Only tenants can view saved properties'
    });
  }

  const tenant_id = req.user.id;

  const sql = `
    SELECT p.*, s.saved_id
    FROM saved_properties s
    JOIN properties p ON s.property_id = p.id
    WHERE s.user_id = ?
  `;

  db.query(sql, [tenant_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error' });
    }

    const formattedProperties = results.map(prop => ({
      ...prop,
      amenities: typeof prop.amenities === 'string'
        ? JSON.parse(prop.amenities)
        : prop.amenities,
      images: typeof prop.images === 'string'
        ? JSON.parse(prop.images)
        : prop.images
    }));

    res.json({ savedProperties: formattedProperties });
  });
});

// START SERVER
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});