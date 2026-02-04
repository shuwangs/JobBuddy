import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

import "./Auth.css"

const Signup = () =>{
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {

    event.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        username,
        email,
        password
      });
      localStorage.setItem("token", response.data.token);
      navigate('/dashboard');

    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Start tracking your dream job today</p>

        <form onSubmit ={handleSignup} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text" 
              className="form-input" 
              placeholder="First Last" 
              required 
              onChange ={(e) => setUsername(e.target.value)}/>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email"
              className="form-input"
              placeholder="name@example.com"
              required
              onChange ={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Create a password" 
              required 
              onChange ={(e) => setPassword(e.target.value)}
              />
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