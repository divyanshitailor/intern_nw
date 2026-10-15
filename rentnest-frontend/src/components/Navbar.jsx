import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './navbar.css'

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

  return (
    <nav className="navbar navbar-expand-lg sticky-top rentnest-navbar py-3">
      <div className="container">

        <Link to="/" className="navbar-brand rentnest-logo">
          <span className="rentnest-logo-mark">⌂</span>
          RentNest
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">

          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-2">

            <li className="nav-item">
              <Link to="/" className="nav-link rentnest-nav-link" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/properties" className="nav-link rentnest-nav-link" onClick={() => setMenuOpen(false)}>
                Explore
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/about" className="nav-link rentnest-nav-link" onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/contact" className="nav-link rentnest-nav-link" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </li>

          </ul>

          <div className="d-flex align-items-center gap-3">

            {user ? (
              <>
                <span className="d-none d-lg-block text-muted small">
                  Hi, {user.name.split(' ')[0]}
                </span>

                <Link to="/dashboard" className="nav-signup">
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn btn-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-login" onClick={() => setMenuOpen(false)}>
                  Log in
                </Link>

                <Link to="/register" className="nav-signup">
                  Get started
                </Link>
              </>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}
