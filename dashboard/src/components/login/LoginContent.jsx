import React, { useContext } from 'react';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import { DigiContext } from '../../context/DigiContext';

const LoginContent = () => {
 const {passwordVisible, togglePasswordVisibility} = useContext(DigiContext)

  return (
    <div className="main-content login-panel">
      <div className="login-body">
        <div className="top d-flex justify-content-between align-items-center">
          <div className="logo">
            <img src="assets/images/logo-big.png" alt="Logo" />
          </div>
        </div>
        <div className="bottom">
          <h3 className="panel-title">Login</h3>
          <form>
            <div className="input-group mb-30">
              <span className="input-group-text">
                <i className="fa-regular fa-user"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Username or email address"
              />
            </div>
            
            <div className="input-group mb-20">
              <span className="input-group-text">
                <i className="fa-regular fa-lock"></i>
              </span>
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="form-control rounded-end"
                placeholder="Password"
              />
              <Link
                role="button"
                className="password-show"
                onClick={togglePasswordVisibility}
              >
                <i className="fa-duotone fa-eye"></i>
              </Link>
            </div>


            <div className="d-flex justify-content-between mb-30">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="loginCheckbox"
                />
                <label
                  className="form-check-label text-white"
                  htmlFor="loginCheckbox"
                >
                  Remember Me
                </label>
              </div>
              <Link to="/resetPassword" className="text-white fs-14">
                Forgot Password?
              </Link>
            </div>
            <button className="btn btn-primary w-100 login-btn">Sign in</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginContent;
