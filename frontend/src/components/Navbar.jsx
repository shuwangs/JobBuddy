import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='bg-gray-800 shadow-md p-4'>
            <div className='navbar-brand max-w-7xl flex justify-between items-center'>
                <div className='text-xl font-bold text-blue-600'>
                    <Link to='/dashboard'>JobBuddy</Link>
                </div>
                <div className='space-x-4'>
                    <Link to='/dashboard' className='text-gray-700 hover:text-red-600'> Add Job </Link>
                </div>
            </div>
        </nav>
        ) 
    }
export default Navbar;