import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';

export default function Dashboard() {
const navigate = useNavigate();

const [user, setUser] = useState(null);
const [myProperties, setMyProperties] = useState([]);
const [savedProperties, setSavedProperties] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const storedUser = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');

if (!storedUser || !token) {
  window.location.href = '/login';
  return null;
}

setUser(storedUser);

if (storedUser.role === 'owner') {
  axios
    .get('http://localhost:5000/api/properties')
    .then((res) => {
      const ownerProps = res.data.properties.filter(
        (p) => p.owner_id === storedUser.id
      );

      setMyProperties(ownerProps);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
} else {
  axios
    .get('http://localhost:5000/api/saved', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setSavedProperties(res.data.savedProperties || []);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}

}, [navigate]);

const handleDelete = async (propertyId) => {
const confirmDelete = window.confirm(
'Are you sure you want to delete this listing?'
);

if (!confirmDelete) return;

try {
  const token = localStorage.getItem('token');

  await axios.delete(
    `http://localhost:5000/api/properties/${propertyId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setMyProperties((prev) =>
    prev.filter((prop) => prop.id !== propertyId)
  );
} catch (err) {
  alert('Error deleting property');
}
};

const handleRemoveSaved = async (savedId) => {
try {
const token = localStorage.getItem('token');

  await axios.delete(
    `http://localhost:5000/api/saved/${savedId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setSavedProperties((prev) =>
    prev.filter((prop) => prop.saved_id !== savedId)
  );
} catch (err) {
  alert('Error removing property');
}

};

if (loading) {
return ( <div className="dashboard-loading">
Loading your workspace... </div>
);
}

return ( <main className="dashboard-page">

  <div className="container">

    {/* =================================================
        HEADER
    ================================================= */}

    <header className="dashboard-header">

      <div>
        <h1 className="dashboard-welcome">
          Welcome,{' '}
          <span>
            {user?.name?.split(' ')[0]}
          </span>
        </h1>

        <p className="dashboard-subtitle">
          {user?.role === 'owner'
            ? 'Manage your property portfolio and listings.'
            : 'Manage your saved homes and discover your next place.'}
        </p>
      </div>

      <div className="dashboard-role">
        {user?.role} Portal
      </div>

    </header>


    {/* =================================================
        OWNER DASHBOARD
    ================================================= */}

    {user?.role === 'owner' && (
      <>

        {/* STATS */}

        <section className="dashboard-stats">

          <div className="row g-4">

            <div className="col-md-4">
              <div className="dashboard-stat">

                <div className="dashboard-stat-label">
                  Active Listings
                </div>

                <h2 className="dashboard-stat-number">
                  {myProperties.length}
                </h2>

              </div>
            </div>


            <div className="col-md-4">
              <div className="dashboard-stat">

                <div className="dashboard-stat-label">
                  Total Profile Views
                </div>

                <h2 className="dashboard-stat-number">
                  124
                </h2>

                <p className="dashboard-stat-change">
                  ↑ 12% this week
                </p>

              </div>
            </div>


            <div className="col-md-4">

              <Link
                to="/add-property"
                className="dashboard-new-button"
              >
                <span>＋</span>
                Add New Property
              </Link>

            </div>

          </div>

        </section>


        {/* PROPERTY PORTFOLIO */}

        <section>

          <div className="dashboard-section-header">

            <h2 className="dashboard-section-title">
              Property Portfolio
            </h2>

            <Link
              to="/properties"
              className="dashboard-section-link"
            >
              Explore all →
            </Link>

          </div>


          <div className="row g-4 mb-5">

            {myProperties.length > 0 ? (

              myProperties.map((prop) => {

                const image =
                  prop.images &&
                  prop.images.length > 0
                    ? `http://localhost:5000${prop.images[0]}`
                    : null;

                return (

                  <div
                    className="col-md-6 col-lg-4"
                    key={prop.id}
                  >

                    <article className="dashboard-property-card">

                      {/* IMAGE */}

                      <div className="dashboard-property-image">

                        {image && (
                          <img
                            src={image}
                            alt={prop.title}
                            onError={(e) => {
                              e.currentTarget.style.display =
                                'none';
                            }}
                          />
                        )}

                      </div>


                      {/* BODY */}

                      <div className="dashboard-property-body">

                        <h3 className="dashboard-property-title">
                          {prop.title}
                        </h3>

                        <p className="dashboard-property-location">
                          <span>⌖</span>{' '}
                          {prop.city || 'Location unavailable'}
                          {' · '}
                          ₹{prop.price?.toLocaleString() || '—'}/mo
                        </p>


                        {/* ACTIONS */}

                        <div className="dashboard-actions">

                          <Link
                            to={`/property/${prop.id}`}
                            className="dashboard-view-button"
                          >
                            View
                          </Link>

                          <Link
                            to={`/edit-property/${prop.id}`}
                            className="dashboard-edit-button"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(prop.id)
                            }
                            className="dashboard-delete-button"
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                    </article>

                  </div>

                );
              })

            ) : (

              <div className="col-12">

                <div className="dashboard-empty">

                  <div className="dashboard-empty-icon">
                    ⌂
                  </div>

                  <h3>
                    No properties yet
                  </h3>

                  <p>
                    Start building your property portfolio
                    by adding your first listing.
                  </p>

                </div>

              </div>

            )}

          </div>

        </section>

      </>
    )}


    {/* =================================================
        TENANT DASHBOARD
    ================================================= */}

    {user?.role === 'tenant' && (
      <section>

        <div className="dashboard-section-header">

          <h2 className="dashboard-section-title">
            Your Wishlist
          </h2>

          <Link
            to="/properties"
            className="dashboard-section-link"
          >
            Explore properties →
          </Link>

        </div>


        <div className="row g-4">

          {savedProperties.length > 0 ? (

            savedProperties.map((prop) => {

              const image =
                prop.images &&
                prop.images.length > 0
                  ? `http://localhost:5000${prop.images[0]}`
                  : null;

              return (

                <div
                  className="col-md-6 col-lg-4"
                  key={prop.saved_id}
                >

                  <article className="dashboard-wishlist-card">

                    {/* IMAGE */}

                    <div
                      className="dashboard-wishlist-image"
                      style={{
                        backgroundImage: image
                          ? `url(${image})`
                          : 'none',
                      }}
                    >
                      {!image && (
                        <div className="dashboard-empty-icon">
                          ⌂
                        </div>
                      )}
                    </div>


                    {/* BODY */}

                    <div className="dashboard-wishlist-body">

                      <h3 className="dashboard-wishlist-title">
                        {prop.title}
                      </h3>

                      <p className="dashboard-wishlist-info">
                        <span>⌖</span>{' '}
                        {prop.city || 'Location unavailable'}
                        {' · '}
                        ₹{prop.price?.toLocaleString() || '—'}/mo
                      </p>


                      <div className="d-flex gap-2">

                        <Link
                          to={`/property/${prop.id}`}
                          className="dashboard-details-button"
                        >
                          View Details →
                        </Link>

                        <button
                          onClick={() =>
                            handleRemoveSaved(
                              prop.saved_id
                            )
                          }
                          className="dashboard-remove-button"
                          title="Remove from wishlist"
                        >
                          ×
                        </button>

                      </div>

                    </div>

                  </article>

                </div>

              );

            })

          ) : (

            <div className="col-12">

              <div className="dashboard-empty">

                <div className="dashboard-empty-icon">
                  ♡
                </div>

                <h3>
                  Your wishlist is empty
                </h3>

                <p>
                  Save properties you love and they'll
                  appear here.
                </p>

                <Link
                  to="/properties"
                  className="dashboard-details-button d-inline-block mt-4"
                  style={{ maxWidth: '190px' }}
                >
                  Explore Properties
                </Link>

              </div>

            </div>

          )}

        </div>

      </section>
    )}

  </div>

</main>
);
}
