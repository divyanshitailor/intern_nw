import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './editproperty.css';

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', city: '', 
    address: '', property_type: '', bhk: '', area_sqft: ''
  });
  const [loading, setLoading] = useState(true);

  // Fetch the existing property details when the page loads
  useEffect(() => {
    axios.get(`http://localhost:5000/api/properties/${id}`)
      .then(res => {
        const prop = res.data.property;
        setFormData({
          title: prop.title, description: prop.description, price: prop.price, 
          city: prop.city, address: prop.address, property_type: prop.property_type, 
          bhk: prop.bhk, area_sqft: prop.area_sqft
        });
        setLoading(false);
      })
      .catch(err => {
        alert("Error loading property details");
        navigate('/dashboard');
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/properties/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('✅ Property updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      alert('Error updating property: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-purple"></div></div>;

return (
  <main className="edit-property-page">

    <div className="edit-property-container">

      {/* HEADER */}
      <div className="edit-property-header">

        <div>
          <span className="edit-property-label">
            RENTNEST / MANAGE PROPERTY
          </span>

          <h1>
            Edit your <em>property.</em>
          </h1>

          <p>
            Update your listing information and keep your property details
            accurate for potential renters.
          </p>
        </div>

        <Link to="/dashboard" className="edit-cancel-button">
          ← Dashboard
        </Link>

      </div>


      {/* FORM CARD */}
      <div className="edit-property-card">

        <form onSubmit={handleSubmit}>

          {/* BASIC INFORMATION */}
          <div className="edit-form-section">

            <div className="edit-section-heading">
              <span>01</span>

              <div>
                <h2>Basic information</h2>
                <p>Update the main details of your listing.</p>
              </div>
            </div>


            <div className="edit-form-group">
              <label>PROPERTY TITLE</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                placeholder="Property title"
                onChange={handleChange}
                required
              />
            </div>


            <div className="edit-form-row">

              <div className="edit-form-group">
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


              <div className="edit-form-group">
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


            <div className="edit-form-group">

              <label>PROPERTY ADDRESS</label>

              <textarea
                name="address"
                value={formData.address}
                placeholder="Complete property address"
                rows="3"
                onChange={handleChange}
                required
              ></textarea>

            </div>

          </div>


          {/* PROPERTY DETAILS */}
          <div className="edit-form-section">

            <div className="edit-section-heading">

              <span>02</span>

              <div>
                <h2>Property details</h2>
                <p>Update size, bedrooms and rental information.</p>
              </div>

            </div>


            <div className="edit-form-row edit-three-columns">

              <div className="edit-form-group">

                <label>BEDROOMS</label>

                <input
                  type="number"
                  name="bhk"
                  value={formData.bhk}
                  min="1"
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="edit-form-group">

                <label>AREA (SQ. FT.)</label>

                <input
                  type="number"
                  name="area_sqft"
                  value={formData.area_sqft}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="edit-form-group">

                <label>MONTHLY RENT (₹)</label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="edit-form-group">

              <label>DESCRIPTION</label>

              <textarea
                name="description"
                value={formData.description}
                placeholder="Describe your property..."
                rows="6"
                onChange={handleChange}
                required
              ></textarea>

            </div>

          </div>


          {/* ACTION AREA */}
          <div className="edit-submit-section">

            <div className="edit-save-info">

              <div className="edit-save-icon">
                ✓
              </div>

              <div>
                <strong>Keep your listing updated</strong>

                <span>
                  Accurate information helps renters make better decisions.
                </span>
              </div>

            </div>


            <div className="edit-actions">

              <Link
                to="/dashboard"
                className="edit-secondary-button"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="edit-save-button"
              >
                Save changes
                <span>→</span>
              </button>

            </div>

          </div>

        </form>

      </div>

    </div>

  </main>
);
}