import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
      const navigate = useNavigate();
    
    const handleSignup = () =>{
        navigate('/register');
    }
    const handleLogin = () =>{
        navigate('/login');
    }
    return (
        <div>
            <div>
                <h1>JobBuddy</h1>
                <h3>Your smart companion for job tracking & applications</h3>

                <p>JobBuddy helps you collect, organize, and track job applications 
                in one place — so you never lose track of opportunities, deadlines, or notes.</p>

            </div>

            <div>
                <h3>Why JobBuddy?</h3>
                - Applying for jobs often means juggling:

                - Multiple job boards

                - Countless tabs and spreadsheets

                - Scattered notes and follow-ups

                - JobBuddy brings everything together.
            </div>

            <div>
                <h3>Ready to get organized?</h3>
                <button
                    onClick={handleSignup}>Get Started</button>

                <button onClick={handleLogin}> Log In</button>
            </div>
            
        </div>
    )
}

export default LandingPage;