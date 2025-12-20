import React from 'react';

import {Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
function App() {

  return (
    <div>
      <Navbar />
        <h1 className="text-3xl font-bold underline">
          Welcome to JobBuddy !
        </h1>
      

      <div>
        <Routes>
          <Route path="/" element={<h1 className="text-2xl">🚧 Home Page</h1>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-job" element={<h1 className="text-2xl">🚧 Add Job Page</h1>} />
          <Route path='/login' element ={<Login />} />
        </Routes>
      </div>

    </div>
    

  )
}

export default App;
