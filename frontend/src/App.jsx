import React from 'react';

import {Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
function App() {

  return (
    <div>
      <Navbar />
    
      <Routes>
          <Route path="/" element={<h1 className="text-2xl">🚧 Home Page</h1>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-job" element={<h1 className="text-2xl">🚧 Add Job Page</h1>} />
          <Route path='/login' element ={<Login />} />
          <Route path='/signup' element ={<Signup />} />
      </Routes>

    </div>
    

  )
}

export default App;
