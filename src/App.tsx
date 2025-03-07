import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TokenCreator from './components/TokenCreator';
import TokenManager from './components/TokenManager';
import CustomLogic from './components/CustomLogic';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          isAuthenticated ? 
          <Navigate to="/dashboard" /> : 
          <Login setAuth={setIsAuthenticated} />
        } />
        <Route path="/dashboard" element={
          isAuthenticated ? 
          <Dashboard setAuth={setIsAuthenticated} /> : 
          <Navigate to="/" />
        } />
        <Route path="/create-token" element={
          isAuthenticated ? 
          <TokenCreator /> : 
          <Navigate to="/" />
        } />
        <Route path="/manage-tokens" element={
          isAuthenticated ? 
          <TokenManager /> : 
          <Navigate to="/" />
        } />
        <Route path="/custom-logic" element={
          isAuthenticated ? 
          <CustomLogic /> : 
          <Navigate to="/" />
        } />
      </Routes>
    </Router>
  );
}

export default App;
