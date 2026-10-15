import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tenant');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email,
          password,
          role
        }
      );

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      navigate('/');
      window.location.reload();

    } catch (err) {
      setError(
        err.response?.data?.message || 'Invalid email or password'
      );
    }
  };

  return (
    <main className="login-page">

      <div className="login-card">

        {/* HEADER */}
        <div className="login-header">

          <span className="login-label">
            WELCOME BACK
          </span>

          <h1>
            Log in to RentNest.
          </h1>

          <p>
            Find your saved homes and manage your rental journey.
          </p>

        </div>


        {/* ERROR */}
        {error && (
          <div className="login-error">
            {error}
          </div>
        )}


        {/* FORM */}
        <form onSubmit={handleLogin}>

          {/* ROLE */}
          <div className="login-role">

            <div>
              <input
                type="radio"
                className="btn-check"
                name="role"
                id="login-tenant"
                checked={role === 'tenant'}
                onChange={() => setRole('tenant')}
              />

              <label
                className="btn"
                htmlFor="login-tenant"
              >
                I am a Tenant
              </label>
            </div>


            <div>
              <input
                type="radio"
                className="btn-check"
                name="role"
                id="login-owner"
                checked={role === 'owner'}
                onChange={() => setRole('owner')}
              />

              <label
                className="btn"
                htmlFor="login-owner"
              >
                I am an Owner
              </label>
            </div>

          </div>


          {/* EMAIL */}
          <div className="login-field">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>


          {/* PASSWORD */}
          <div className="login-field">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>


          {/* BUTTON */}
          <button
            type="submit"
            className="login-button"
          >
            Log in to RentNest
          </button>

        </form>


        {/* REGISTER */}
        <p className="login-register-text">
          Don't have an account?{' '}
          <Link to="/register">
            Create one
          </Link>
        </p>

      </div>

    </main>
  );
}