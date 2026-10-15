import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="rentnest-footer">

      <div className="container">

        <div className="row g-5">

          {/* BRAND */}
          <div className="col-lg-5">

            <Link to="/" className="footer-logo">
              <span className="footer-logo-icon">⌂</span>
              RentNest
            </Link>

            <p className="footer-description">
              Making it easier to discover comfortable, trusted and
              affordable spaces you can proudly call home.
            </p>

          </div>


          {/* QUICK LINKS */}
          <div className="col-6 col-lg-2">

            <div className="footer-heading">
              Explore
            </div>

            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/properties">Properties</Link>
              <Link to="/about">About us</Link>
              <Link to="/contact">Contact</Link>
            </div>

          </div>


          {/* PROPERTY */}
          <div className="col-6 col-lg-2">

            <div className="footer-heading">
              Properties
            </div>

            <div className="footer-links">
              <Link to="/properties?type=Apartment">
                Apartments
              </Link>

              <Link to="/properties?type=Villa">
                Villas
              </Link>

              <Link to="/properties?type=PG">
                PGs
              </Link>

              <Link to="/register">
                List property
              </Link>
            </div>

          </div>


          {/* CONTACT */}
          <div className="col-lg-3">

            <div className="footer-heading">
              Get in touch
            </div>

            <div className="footer-links">
              <span>hello@rentnest.com</span>
              <span>India</span>
              <span>Instagram @rentnest</span>
            </div>

          </div>

        </div>


        <div className="footer-bottom d-flex justify-content-between flex-wrap gap-2">

          <span>
            © {new Date().getFullYear()} RentNest. All rights reserved.
          </span>

          <span>
            Made for better living.
          </span>

        </div>

      </div>

    </footer>
  );
}
