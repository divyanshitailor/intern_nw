import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './register.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tenant');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        role
      });

      navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed'
      );
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <h3>Create an Account</h3>

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>

          {/* ROLE */}
          <div className="register-role">

            <input
              type="radio"
              className="btn-check"
              name="role"
              id="tenant"
              checked={role === 'tenant'}
              onChange={() => setRole('tenant')}
            />

            <label
              className="btn"
              htmlFor="tenant"
            >
              I am a Tenant
            </label>


            <input
              type="radio"
              className="btn-check"
              name="role"
              id="owner"
              checked={role === 'owner'}
              onChange={() => setRole('owner')}
            />

            <label
              className="btn"
              htmlFor="owner"
            >
              I am an Owner
            </label>

          </div>


          {/* NAME */}
          <input
            type="text"
            placeholder="Full Name"
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />


          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email Address"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />


          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Create Password"
            className="form-control mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />


          {/* BUTTON */}
          <button
            type="submit"
            className="btn-purple w-100"
          >
            Create Account
          </button>


          {/* LOGIN */}
          <p className="register-login-text">
            Already have an account?{' '}
            <Link to="/login">
              Login
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
}