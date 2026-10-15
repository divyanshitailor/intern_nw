const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Images will be temporarily stored in the 'uploads' folder
    cb(null, './uploads/'); 
  },
  filename: function (req, file, cb) {
    // Rename file to ensure uniqueness: property-163456789.jpg
    cb(null, 'property-' + Date.now() + path.extname(file.originalname));
  }
});

// Check file type (Only allow images)
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only! (JPEG, JPG, PNG, WEBP)');
  }
}

// Initialize Multer for multiple files (up to 5 images per property)
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit per image
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).array('images', 5); // Expecting an array of files named 'images'

module.exports = upload;