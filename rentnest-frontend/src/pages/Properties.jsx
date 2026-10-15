import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import './properties.css'

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [searchParams] = useSearchParams();

  const initialCity = searchParams.get('city') || '';
  const initialType = searchParams.get('type') || '';

  const [city, setCity] = useState(initialCity);
  const [type, setType] = useState(initialType);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const fetchProperties = () => {
    let url = 'http://localhost:5000/api/properties?';

    if (city) url += `city=${city}&`;
    if (type) url += `property_type=${type}`;

    axios
      .get(url)
      .then((res) => setProperties(res.data.properties))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProperties();
  }, [city, type]);

  const handleSave = async (propertyId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/saved/${propertyId}/save`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('❤️ Property saved successfully!');
    } catch (err) {
      alert(
        err.response?.data?.message || 'Error saving property'
      );
    }
  };

  return (
    <main className="properties-page">

      {/* ================= HEADER ================= */}

      <section className="properties-header">
        <div className="container">

          <div className="properties-heading-row">

            <div>
              <span className="section-label">
                FIND YOUR NEXT HOME
              </span>

              <h1>
                Explore <em>properties.</em>
              </h1>

              <p>
                Discover comfortable spaces in the cities you love.
              </p>
            </div>

            <div className="property-count">
              <strong>{properties.length}</strong>
              <span>homes available</span>
            </div>

          </div>


          {/* ================= FILTER BAR ================= */}

          <div className="property-filters">

            <div className="filter-item">
              <span className="filter-icon">⌖</span>

              <div>
                <label>LOCATION</label>

                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">All Cities</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Pune">Pune</option>
                </select>
              </div>
            </div>


            <div className="filter-divider"></div>


            <div className="filter-item">
              <span className="filter-icon">⌂</span>

              <div>
                <label>PROPERTY TYPE</label>

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="PG">PG</option>
                  <option value="Independent House">
                    Independent House
                  </option>
                </select>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ================= PROPERTY GRID ================= */}

      <section className="properties-list">
        <div className="container">

          {properties.length > 0 ? (

            <div className="row g-4">

              {properties.map((prop) => {

                const thumbnail =
                  prop.images && prop.images.length > 0
                    ? `http://localhost:5000${prop.images[0]}`
                    : null;

                return (

                  <div
                    className="col-md-6 col-xl-4"
                    key={prop.id}
                  >

                    <article className="property-card">

                      {/* IMAGE */}

                      <Link
                        to={`/property/${prop.id}`}
                        className="property-image"
                      >

                        {thumbnail ? (
                          <img
                            src={thumbnail}
                            alt={prop.title}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.parentElement.classList.add(
                                'image-error'
                              );
                            }}
                          />
                        ) : (
                          <div className="no-property-image">
                            <span>⌂</span>
                            <p>No image available</p>
                          </div>
                        )}

                        <span className="property-type">
                          {prop.property_type || 'Property'}
                        </span>

                        <span className="property-status">
                          {prop.status
                            ? prop.status.toUpperCase()
                            : 'AVAILABLE'}
                        </span>

                      </Link>


                      {/* CONTENT */}

                      <div className="property-content">

                        <div className="property-price">
                          ₹{prop.price?.toLocaleString() || '—'}
                          <span>/ month</span>
                        </div>


                        <Link
                          to={`/property/${prop.id}`}
                          className="property-title"
                        >
                          {prop.title}
                        </Link>


                        <p className="property-location">
                          <span>⌖</span>
                          {prop.city || 'Location unavailable'}
                        </p>


                        <div className="property-features">

                          <span>
                            <strong>{prop.bhk || '—'}</strong>
                            BHK
                          </span>

                          <i></i>

                          <span>
                            <strong>
                              {prop.area_sqft || '—'}
                            </strong>
                            Sq.Ft
                          </span>

                        </div>


                        <div className="property-actions">

                          <Link
                            to={`/property/${prop.id}`}
                            className="view-property"
                          >
                            View property
                            <span>→</span>
                          </Link>


                          {user && user.role === 'tenant' && (

                            <button
                              onClick={() =>
                                handleSave(prop.id)
                              }
                              className="save-property"
                              title="Save property"
                            >
                              ♡
                            </button>

                          )}

                        </div>

                      </div>

                    </article>

                  </div>

                );
              })}

            </div>

          ) : (

            <div className="empty-properties">

              <div className="empty-icon">
                ⌂
              </div>

              <h3>No properties found</h3>

              <p>
                Try changing your city or property type.
              </p>

              <button
                onClick={() => {
                  setCity('');
                  setType('');
                }}
                className="clear-filters"
              >
                Clear filters
              </button>

            </div>

          )}

        </div>
      </section>

    </main>
  );
}