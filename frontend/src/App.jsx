import React from 'react';

import {Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
function App() {

  return (
    <div>
      <Navbar />
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      

      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<h1 className="text-2xl">🚧 Dashboard Page</h1>} />
          <Route path="/add-job" element={<h1 className="text-2xl">🚧 Add Job Page</h1>} />
        </Routes>
      </div>

    </div>
    

  )
}

export default App;
