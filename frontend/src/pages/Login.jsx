import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "./Auth.css"

const Login = () =>{
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    console.log("Logging with ", email, password);

    navigate('/dashboard');
  }

  return (
    <div className="auth-container">
      <div className="auth-card">

        <form onSubmit ={handleLogin} className="auth-form">
          <div className='form-group'>
            <label>Email</label>
            <input type="email" className="form-input" 
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
            Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
          </div>

        </form>
      </div>
    </div>

  )
}

export default Login;