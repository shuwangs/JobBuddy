import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav relative className='relative bg-red-800/50 shadow p-4'>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                <a href="#" aria-current="page" class="rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white">JobBuddy</a>
                <a href="#" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">addJob</a>
               
            </div>
        </nav>


        ) 
    }
export default Navbar;