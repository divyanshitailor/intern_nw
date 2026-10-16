import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './propertydetails.css'

export default function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/properties/${id}`)
      .then((res) => {
        setProperty(res.data.property);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="details-loading">
        <div className="details-spinner"></div>
        <p>Loading property...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="details-not-found">
        <div className="not-found-icon">⌂</div>
        <h2>Property not found</h2>
        <p>This property may have been removed or is no longer available.</p>
        <Link to="/properties" className="back-button">
          ← Explore properties
        </Link>
      </div>
    );
  }

  const images = property.images || [];

  return (
    <main className="property-details-page">

      {/* ================= TOP SECTION ================= */}

      <section className="details-header">
        <div className="container">

          <Link to="/properties" className="details-back">
            ← Back to Explore
          </Link>

          <div className="details-heading">

            <div>
              <span className="details-label">
                {property.property_type || 'PROPERTY'}
              </span>

              <h1>{property.title || 'Untitled Property'}</h1>

              <p className="details-location">
                <span>⌖</span>
                {property.address ? `${property.address}, ` : ''}
                {property.city || 'Location unavailable'}
              </p>
            </div>

            <div className="details-status">
              {property.status
                ? property.status.toUpperCase()
                : 'AVAILABLE'}
            </div>

          </div>

        </div>
      </section>


      {/* ================= IMAGE GALLERY ================= */}

      <section className="details-gallery-section">
        <div className="container">

          {images.length > 0 ? (

            <div className={`details-gallery gallery-${Math.min(images.length, 4)}`}>

              {images.slice(0, 4).map((img, index) => (

                <div
                  className={`gallery-image gallery-image-${index}`}
                  key={index}
                >
                  <img
                    src={img?.startsWith('http') ? img : `http://localhost:5000${img}`}
                    alt={`${property.title} ${index + 1}`}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement.classList.add(
                        'gallery-image-error'
                      );
                    }}
                  />
                </div>

              ))}

            </div>

          ) : (

            <div className="details-no-image">
              <span>⌂</span>
              <p>No property images available</p>
            </div>

          )}

        </div>
      </section>


      {/* ================= MAIN CONTENT ================= */}

      <section className="details-content-section">
        <div className="container">

          <div className="row g-5">

            {/* LEFT */}

            <div className="col-lg-8">

              {/* PROPERTY QUICK INFO */}

              <div className="details-info-grid">

                <div>
                  <span className="info-label">BEDROOMS</span>
                  <strong>{property.bhk || '—'}</strong>
                  <small>BHK</small>
                </div>

                <div>
                  <span className="info-label">AREA</span>
                  <strong>{property.area_sqft || '—'}</strong>
                  <small>Sq.Ft.</small>
                </div>

                <div>
                  <span className="info-label">TYPE</span>
                  <strong>{property.property_type || '—'}</strong>
                  <small>Property</small>
                </div>

              </div>


              {/* DESCRIPTION */}

              <div className="details-section">

                <span className="details-section-label">
                  ABOUT THIS HOME
                </span>

                <h2>A space you'll love to come home to.</h2>

                <p className="details-description">
                  {property.description ||
                    'No description has been provided for this property.'}
                </p>

              </div>


              {/* AMENITIES */}

              <div className="details-section">

                <span className="details-section-label">
                  AMENITIES
                </span>

                <h2>Everything you need.</h2>

                {property.amenities &&
                property.amenities.length > 0 ? (

                  <div className="amenities-grid">

                    {property.amenities.map((amenity, index) => (

                      <div
                        className="amenity-item"
                        key={index}
                      >
                        <span>✓</span>
                        {amenity}
                      </div>

                    ))}

                  </div>

                ) : (

                  <p className="no-amenities">
                    No amenities have been listed.
                  </p>

                )}

              </div>

            </div>


            {/* RIGHT - RENT CARD */}

            <div className="col-lg-4">

              <aside className="rent-card">

                <span className="rent-label">
                  MONTHLY RENT
                </span>

                <div className="rent-price">
                  ₹{property.price?.toLocaleString() || '—'}
                </div>

                <span className="rent-period">
                  per month
                </span>


                <div className="rent-divider"></div>


                <div className="rent-details">

                  <div>
                    <span>Property type</span>
                    <strong>
                      {property.property_type || '—'}
                    </strong>
                  </div>

                  <div>
                    <span>Bedrooms</span>
                    <strong>
                      {property.bhk || '—'} BHK
                    </strong>
                  </div>

                  <div>
                    <span>Area</span>
                    <strong>
                      {property.area_sqft || '—'} Sq.Ft.
                    </strong>
                  </div>

                  <div>
                    <span>Availability</span>
                    <strong className="available-text">
                      {property.status || 'Available'}
                    </strong>
                  </div>

                </div>


                <button className="rent-primary-button">
                  Book Now / Pay
                  <span>→</span>
                </button>

                <button
                  className="rent-secondary-button"
                  onClick={() => alert("Contact Owner feature will be available soon.")}
                >
                  Contact Owner
                </button>

                <p className="rent-note">
                  You can contact the owner before making
                  any payment.
                </p>

              </aside>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}