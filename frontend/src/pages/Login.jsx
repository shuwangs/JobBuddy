import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./Auth.css"

const Login = () => {

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      console.log("Attempting to login with ", email, password);

      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        username: email, 
        password: password
      });

      const token = response.data.token;
      console.log("Login Success! Token:", token);

      localStorage.setItem('token', token);
      localStorage.setItem('username', email.split('@')[0]);
      navigate('/dashboard');

    } catch (e) {
      console.error("Login Failed:", e);
      setError("Invalid email or password. Please try again.");
    }
    

    navigate('/dashboard');
  }

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1 className="auth-title">
          Welcome to JobBuddy !
        </h1>

        {/* if there is error, display it */}
        {error && <p style={{color: 'red', marginBottom: '1rem'}}>{error}</p>}


        <form onSubmit ={handleLogin} className="auth-form">
          <div className='form-group'>
            <label>Email</label>
            <input type="text" className="form-input" 
              placeholder='email@example.com'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn-submit">
            Log In
          </button>

          <div className="auth-footer">
            Don't have an account? <Link to="/register" className="auth-link">Sign Up</Link>
          </div>

        </form>
      </div>
    </div>

  )
}

export default Login;