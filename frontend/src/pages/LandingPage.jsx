import React from "react";
import { useNavigate } from "react-router-dom";
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    
    const handleSignup = () =>{
        navigate('/register');
    }
    const handleLogin = () =>{
        navigate('/login');
    }
    return (
        <div className="landing-container">
            <div className="hero">
                <h1>Track every job. Miss nothing</h1>
                <p>Your personal job application command center.</p>
             
            </div>

            <div className="audience">
                <h3> Perfect for:</h3>
                <ul>
                    <li>Software engineering job seekers</li>
                    <li>Career switchers</li>
                    <li>Anyone applying seriously to 10+ roles</li>

                </ul>

            </div>

            <div className="cta">
                <h3>Ready to get organized?</h3>
                <div className="cta-btns">
                    <button onClick={handleSignup}>Get Started</button>
                    <button onClick={handleLogin}> Log In</button>
                </div>
            </div>
            
        </div>
    )
}

export default LandingPage;