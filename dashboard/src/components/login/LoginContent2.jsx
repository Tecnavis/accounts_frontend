import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginContent2 = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/users/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store tokens in cookies
        Cookies.set('access_token', data.access_token, { expires: 1 }); // 1 day
        Cookies.set('refresh_token', data.refresh_token, { expires: 7 }); // 7 days

        // Redirect to dashboard/home
        navigate('/');
      } else {
        setError(data.detail || 'Invalid login credentials');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content login-panel login-panel-2">
      <h3 className="panel-title">Login</h3>
      <div className="login-body login-body-2">
        <div className="top d-flex justify-content-between align-items-center">
          <div className="logo">
            <img src="assets/images/logo-black.png" alt="Logo" />
          </div>
          <Link to="/"><i className="fa-duotone fa-house-chimney"></i></Link>
        </div>
        <div className="bottom">
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-30">
              <input
                type="text"
                className="form-control"
                placeholder="Email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="input-group-text"><i className="fa-regular fa-user"></i></span>
            </div>
            <div className="input-group mb-20">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="input-group-text"><i className="fa-regular fa-lock"></i></span>
            </div>

            {error && <p className="text-danger">{error}</p>}

            <div className="d-flex justify-content-between mb-30">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="loginCheckbox" />
                <label className="form-check-label text-white">Remember Me</label>
              </div>
              <Link to="/resetPassword" className="text-white fs-14">Forgot Password?</Link>
            </div>
            <button type="submit" className="btn btn-primary w-100 login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="other-option">
            <p className="mb-0">Don't have an account? <Link to="/registration2" className="text-white text-decoration-underline">Create</Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginContent2;
