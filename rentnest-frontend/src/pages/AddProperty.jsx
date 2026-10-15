import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './addproperty.css';

export default function AddProperty() {
  // Upgraded state to include all new database fields
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', city: 'Bangalore', 
    address: '', property_type: 'Apartment', bhk: '1', area_sqft: ''
  });
  
  // Separate states for arrays and files
  const [amenities, setAmenities] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Standard amenities list
  const availableAmenities = ['WiFi', 'Parking', 'Gym', 'Swimming Pool', '24/7 Security', 'Fully Furnished'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle amenities in the array
  const handleAmenityChange = (e) => {
    const value = e.target.value;
    setAmenities(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  // Convert the FileList object into a standard array
  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // We MUST use FormData to send files; standard JSON will not work
    const submitData = new FormData();
    
    // 1. Append all text fields
    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key]);
    });
    
    // 2. Append amenities as a JSON string for the backend to parse
    submitData.append('amenities', JSON.stringify(amenities));
    
    // 3. Append each image file (the name 'images' must match the Multer configuration)
    images.forEach(image => {
      submitData.append('images', image); 
    });

    try {
      await axios.post('http://localhost:5000/api/properties', submitData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Crucial for file uploads
        }
      });
      alert('✅ Property listed successfully!');
      navigate('/dashboard');
    } catch (err) {
      alert('Error adding property: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

return (
  <main className="add-property-page">

    <div className="add-property-container">

      {/* HEADER */}
      <div className="add-property-header">
        <span className="add-property-label">RENTNEST / LIST PROPERTY</span>

        <h1>
          List your <em>property.</em>
        </h1>

        <p>
          Share your space with people looking for their next home.
        </p>
      </div>


      {/* FORM CARD */}
      <div className="add-property-card">

        <form onSubmit={handleSubmit} encType="multipart/form-data">

          {/* BASIC INFORMATION */}
          <div className="form-section">

            <div className="form-section-heading">
              <span>01</span>
              <div>
                <h2>Basic information</h2>
                <p>Tell us about the property.</p>
              </div>
            </div>

            <div className="form-group">
              <label>PROPERTY TITLE</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Modern 2 BHK Apartment"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label>PROPERTY TYPE</label>

                <select
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleChange}
                >
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="PG">PG</option>
                  <option value="Independent House">
                    Independent House
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>CITY</label>

                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Pune">Pune</option>
                </select>
              </div>

            </div>

            <div className="form-group">
              <label>PROPERTY ADDRESS</label>

              <textarea
                name="address"
                placeholder="Enter the complete property address"
                rows="3"
                onChange={handleChange}
                required
              ></textarea>
            </div>

          </div>


          {/* PROPERTY DETAILS */}
          <div className="form-section">

            <div className="form-section-heading">
              <span>02</span>

              <div>
                <h2>Property details</h2>
                <p>Add size, rooms and rental information.</p>
              </div>
            </div>

            <div className="form-row three-columns">

              <div className="form-group">
                <label>BEDROOMS</label>

                <input
                  type="number"
                  name="bhk"
                  value={formData.bhk}
                  placeholder="2"
                  min="1"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>AREA (SQ. FT.)</label>

                <input
                  type="number"
                  name="area_sqft"
                  value={formData.area_sqft}
                  placeholder="1200"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>MONTHLY RENT (₹)</label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  placeholder="25000"
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label>DESCRIPTION</label>

              <textarea
                name="description"
                placeholder="Describe the property, surroundings and anything renters should know..."
                rows="5"
                onChange={handleChange}
                required
              ></textarea>
            </div>

          </div>


          {/* AMENITIES */}
          <div className="form-section">

            <div className="form-section-heading">
              <span>03</span>

              <div>
                <h2>Amenities</h2>
                <p>Select everything this property offers.</p>
              </div>
            </div>

            <div className="amenities-selection">

              {availableAmenities.map((amenity) => (

                <label
                  key={amenity}
                  className={`amenity-option ${
                    amenities.includes(amenity) ? 'selected' : ''
                  }`}
                >

                  <input
                    type="checkbox"
                    value={amenity}
                    checked={amenities.includes(amenity)}
                    onChange={handleAmenityChange}
                  />

                  <span className="amenity-check">✓</span>

                  <span>{amenity}</span>

                </label>

              ))}

            </div>

          </div>


          {/* IMAGES */}
          <div className="form-section">

            <div className="form-section-heading">
              <span>04</span>

              <div>
                <h2>Property images</h2>
                <p>Add up to 5 clear photos of your property.</p>
              </div>
            </div>

            <label className="image-upload-box">

              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                required
              />

              <div className="upload-icon">↑</div>

              <strong>
                Click to upload images
              </strong>

              <span>
                PNG, JPG or JPEG · Maximum 5 images
              </span>

              {images.length > 0 && (
                <small>
                  {images.length} image{images.length > 1 ? 's' : ''} selected
                </small>
              )}

            </label>

          </div>


          {/* SUBMIT */}
          <div className="publish-section">

            <div>
              <strong>Ready to publish?</strong>

              <span>
                Your listing will be visible to renters after submission.
              </span>
            </div>

            <button
              type="submit"
              className="publish-button"
              disabled={loading}
            >
              {loading ? 'Publishing...' : 'Publish listing'}
              <span>→</span>
            </button>

          </div>

        </form>

      </div>

    </div>

  </main>
);
}