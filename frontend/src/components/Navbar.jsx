import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import './Navbar.css'

const Navbar = () => {
    const user = {
        name: "Shu",

        // OMG a free API to generate avatars
        avatar: "https://ui-avatars.com/api/?name=Shu&background=0D8ABC&color=fff&rounded=true" 

    };
    return (
        <nav className='navbar'>
            <div className='navbar-content'>
                <div className='logo'>
                    <Link to='/dashboard'>
                        <Logo /> 
                        <span className='web-title'>
                            JobBuddy
                        </span>
                    </Link> 
                </div>

                <div className="menu">
                    <Link to="/addjob" className="btn-add">
                        + Add Job 
                    </Link>

                    <div className="user-profile">
                        <img 
                            src={user.avatar} 
                            alt="User Avatar" 
                            className="user-avatar" 
                        />
                    </div>
                </div>
            </div>
        </nav>

        ) 
    }
export default Navbar;