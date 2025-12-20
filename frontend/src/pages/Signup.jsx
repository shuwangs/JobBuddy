import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "./Auth.css"

const Signup = () =>{
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  }

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Start tracking your dream job today</p>

        <form onSubmit ={handleSignup} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" className="form-input" placeholder="Shu Wang" required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-input" placeholder="name@example.com" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-input" placeholder="Create a password" required />
          </div>


          <button type="submit" className="btn-submit">
            Sign Up
          </button>

          <div className="auth-footer">
            Already have an account? <Link to="/login" className="auth-link">Log In</Link>
          </div>

        </form>
      </div>
    </div>

  )
}

export default Signup;