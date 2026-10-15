import { Link } from 'react-router-dom';
import './about.css';

export default function About() {
  return (
    <main className="about-page">

      {/* ================= HERO ================= */}

      <section className="about-hero">
        <div className="container">

          <div className="about-hero-content">

            <span className="about-eyebrow">
              ✦ ABOUT RENTNEST
            </span>

            <h1>
              A better way to
              <br />
              <em>find home.</em>
            </h1>

            <p>
              RentNest brings renters and property owners together through
              a simple, transparent and trusted rental experience.
            </p>

          </div>

        </div>
      </section>


      {/* ================= STORY ================= */}

      <section className="about-story">
        <div className="container">

          <div className="row align-items-center g-5">

            <div className="col-lg-6">

              <span className="about-section-label">
                OUR STORY
              </span>

              <h2>
                Renting shouldn't
                <br />
                feel <em>complicated.</em>
              </h2>

              <p>
                Finding a place to live can often mean scrolling through
                endless listings, dealing with unclear information and
                wondering whether a property can actually be trusted.
              </p>

              <p>
                RentNest was created to make that experience simpler.
                We connect tenants with property owners and give both
                sides the tools they need to make better decisions.
              </p>

              <Link to="/properties" className="about-primary-btn">
                Explore properties
                <span>→</span>
              </Link>

            </div>


            <div className="col-lg-6">

              <div className="about-visual">

                <div className="visual-glow"></div>

                <div className="visual-card visual-card-main">

                  <div className="visual-top">
                    <span>RENTNEST</span>
                    <span>01</span>
                  </div>

                  <div className="visual-house">
                    <div className="visual-roof"></div>

                    <div className="visual-building">

                      <div className="visual-window"></div>
                      <div className="visual-window"></div>
                      <div className="visual-window"></div>

                      <div className="visual-door"></div>

                    </div>
                  </div>

                  <div className="visual-bottom">
                    <strong>Find your place.</strong>
                    <span>Live better.</span>
                  </div>

                </div>

                <div className="visual-floating">
                  <span className="floating-check">✓</span>

                  <div>
                    <strong>Verified homes</strong>
                    <small>Trusted listings</small>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= VALUES ================= */}

      <section className="about-values">

        <div className="container">

          <div className="values-heading">

            <div>
              <span className="about-section-label">
                WHAT WE BELIEVE
              </span>

              <h2>
                Built around
                <br />
                <em>better living.</em>
              </h2>
            </div>

            <p>
              Every part of RentNest is designed to make finding and
              managing a home feel more effortless.
            </p>

          </div>


          <div className="values-grid">

            <div className="value-card">

              <span className="value-number">01</span>

              <div className="value-icon">✓</div>

              <h3>Trust first</h3>

              <p>
                We believe renters deserve reliable property information
                and a transparent experience.
              </p>

            </div>


            <div className="value-card">

              <span className="value-number">02</span>

              <div className="value-icon">⌖</div>

              <h3>Right place</h3>

              <p>
                Discover homes in locations that fit your lifestyle,
                priorities and everyday needs.
              </p>

            </div>


            <div className="value-card">

              <span className="value-number">03</span>

              <div className="value-icon">↗</div>

              <h3>Keep it simple</h3>

              <p>
                From exploring properties to connecting with owners,
                everything should feel straightforward.
              </p>

            </div>


            <div className="value-card">

              <span className="value-number">04</span>

              <div className="value-icon">♡</div>

              <h3>People first</h3>

              <p>
                Because finding a home isn't just about a property.
                It's about finding somewhere you belong.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= STATS ================= */}

      <section className="about-stats">

        <div className="container">

          <div className="stats-card">

            <div className="stat-item">
              <strong>1K+</strong>
              <span>Happy renters</span>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
              <strong>500+</strong>
              <span>Listed properties</span>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
              <strong>20+</strong>
              <span>City locations</span>
            </div>

            <div className="stat-divider"></div>

            <div className="stat-item">
              <strong>24/7</strong>
              <span>Platform access</span>
            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="about-cta">

        <div className="container">

          <div className="about-cta-box">

            <div>

              <span className="about-section-label">
                YOUR NEXT CHAPTER
              </span>

              <h2>
                Somewhere out there,
                <br />
                <em>feels like home.</em>
              </h2>

            </div>

            <Link to="/properties" className="about-cta-btn">
              Find your home
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}
