import React from 'react';
import {Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddJob from './pages/AddJob';
import Landing from './pages/LandingPage';

function App() {

  return (
    <div>
      <Navbar />
    
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-job" element={<h1 className="text-2xl">🚧 Add Job Page</h1>} />
          <Route path='/login' element ={<Login />} />
          <Route path='/register' element ={<Signup />} />
          <Route path="/addjob" element ={<AddJob />} />

      </Routes>

    </div>
    

  )
}

export default App;
