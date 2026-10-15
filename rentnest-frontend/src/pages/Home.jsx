import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './home.css'

export default function Home() {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (city) {
      navigate(`/properties?city=${city}`);
    } else {
      navigate('/properties');
    }
  };

  return (
    <main className="rentnest-home">

      {/* ================= HERO ================= */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-5">

            {/* LEFT */}
            <div className="col-lg-7">

              <div className="hero-label">
                <span>✦</span>
                FIND A PLACE YOU'LL LOVE
              </div>

              <h1 className="hero-title">
                Find a place
                <br />
                <span>you can call home.</span>
              </h1>

              <p className="hero-description">
                Discover comfortable homes, apartments and PGs in the
                cities you love. Your next chapter starts here.
              </p>

              {/* SEARCH */}
              <form onSubmit={handleSearch} className="home-search">

                <div className="search-icon">
                  ⌖
                </div>

                <div className="search-field">
                  <label>LOCATION</label>

                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="">Choose a city</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>

                <button type="submit" className="search-button">
                  Search
                  <span>→</span>
                </button>

              </form>

              <div className="hero-trust">
                <div className="trust-avatars">
                  <span>G</span>
                  <span>A</span>
                  <span>R</span>
                  <span>+</span>
                </div>

                <p>
                  Trusted by <strong>1,000+</strong> people looking for a home
                </p>
              </div>

            </div>

            {/* RIGHT */}
            <div className="col-lg-5">

              <div className="hero-property">

                <div className="property-image-placeholder">
                  <div className="property-sun"></div>

                  <div className="property-house">
                    <div className="house-roof"></div>
                    <div className="house-body">
                      <div className="house-window"></div>
                      <div className="house-door"></div>
                    </div>
                  </div>

                  <div className="property-ground"></div>
                </div>

                <div className="floating-card top-card">
                  <span className="floating-icon">✓</span>
                  <div>
                    <strong>Verified homes</strong>
                    <small>Safe & reliable listings</small>
                  </div>
                </div>

                <div className="floating-card bottom-card">
                  <div className="mini-price">₹18k</div>
                  <div>
                    <strong>Beautiful spaces</strong>
                    <small>Starting from ₹10k/month</small>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ================= CATEGORIES ================= */}
      <section className="categories-section">
        <div className="container">

          <div className="section-heading">
            <div>
              <span className="section-label">EXPLORE</span>
              <h2>Find the right space for you</h2>
            </div>

            <Link to="/properties" className="view-all">
              View all properties →
            </Link>
          </div>

          <div className="row g-4">

            <div className="col-md-4">
              <Link
                to="/properties?type=Apartment"
                className="category-card apartment-card"
              >
                <div className="category-icon">⌂</div>

                <div>
                  <span>01</span>
                  <h3>Modern Apartments</h3>
                  <p>Comfortable city living with everything nearby.</p>
                </div>

                <div className="category-arrow">↗</div>
              </Link>
            </div>

            <div className="col-md-4">
              <Link
                to="/properties?type=Villa"
                className="category-card villa-card"
              >
                <div className="category-icon">⌂</div>

                <div>
                  <span>02</span>
                  <h3>Luxury Villas</h3>
                  <p>Spacious homes designed for peaceful living.</p>
                </div>

                <div className="category-arrow">↗</div>
              </Link>
            </div>

            <div className="col-md-4">
              <Link
                to="/properties?type=PG"
                className="category-card pg-card"
              >
                <div className="category-icon">⌂</div>

                <div>
                  <span>03</span>
                  <h3>Cozy PGs</h3>
                  <p>Affordable and convenient spaces for everyday life.</p>
                </div>

                <div className="category-arrow">↗</div>
              </Link>
            </div>

          </div>
        </div>
      </section>


      {/* ================= WHY RENTNEST ================= */}
      <section className="why-section">
        <div className="container">

          <div className="row align-items-center g-5">

            <div className="col-lg-5">
              <span className="section-label">WHY RENTNEST</span>

              <h2 className="why-title">
                Renting a home
                <br />
                should feel <em>simple.</em>
              </h2>

              <p className="why-description">
                We make property hunting easier by bringing trusted listings,
                transparent information and a simple experience together in
                one place.
              </p>

              <Link to="/about" className="dark-button">
                Learn more
                <span>→</span>
              </Link>
            </div>

            <div className="col-lg-7">

              <div className="benefits-grid">

                <div className="benefit-card">
                  <div className="benefit-number">01</div>
                  <div className="benefit-icon">✓</div>
                  <h4>Verified Properties</h4>
                  <p>
                    Browse listings with reliable property information.
                  </p>
                </div>

                <div className="benefit-card">
                  <div className="benefit-number">02</div>
                  <div className="benefit-icon">⌖</div>
                  <h4>Great Locations</h4>
                  <p>
                    Find homes in the neighborhoods that suit you best.
                  </p>
                </div>

                <div className="benefit-card">
                  <div className="benefit-number">03</div>
                  <div className="benefit-icon">₹</div>
                  <h4>Transparent Pricing</h4>
                  <p>
                    Compare properties and make informed decisions.
                  </p>
                </div>

                <div className="benefit-card">
                  <div className="benefit-number">04</div>
                  <div className="benefit-icon">♡</div>
                  <h4>Made For You</h4>
                  <p>
                    A simple experience designed around renters.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= CTA ================= */}
      <section className="cta-section">
        <div className="container">

          <div className="cta-box">

            <div>
              <span className="section-label light-label">
                YOUR NEXT HOME
              </span>

              <h2>
                Ready to find
                <br />
                your <em>RentNest?</em>
              </h2>

              <p>
                Explore properties and find a space that feels like home.
              </p>
            </div>

            <Link to="/properties" className="cta-button">
              Explore properties
              <span>→</span>
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}
