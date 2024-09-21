// src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from "./Header/Navbar";
import Signin from './pages/Signin'; 
import Home from './Home/Home';
import Registration from './pages/Registration';
import ProtectedRoute from '../src/ProtectedRoute'; // Import the ProtectedRoute component

function App() {






  return (
    <div className="App">
      <Navbar />




      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route path="/signin" element={<Signin />} />  
        <Route path="/api/auth/signup" element={<Registration />} />
        
       
      </Routes>
    </div>
  );
}

export default App;
