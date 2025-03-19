import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomLogic from './components/CustomLogic';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import TokenCreator from './components/TokenCreator';
import TokenManager from './components/TokenManager';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Solana Token Management</h1>
          <nav className="mt-4">
            <Link to="/" className="mr-4 text-white">Home</Link>
            <Link to="/custom-logic" className="mr-4 text-white">Custom Logic</Link>
            <Link to="/dashboard" className="mr-4 text-white">Dashboard</Link>
            <Link to="/login" className="mr-4 text-white">Login</Link>
            <Link to="/token-creator" className="mr-4 text-white">Token Creator</Link>
            <Link to="/token-manager" className="mr-4 text-white">Token Manager</Link>
          </nav>
        </header>
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<CustomLogic />} />
            <Route path="/custom-logic" element={<CustomLogic />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/token-creator" element={<TokenCreator />} />
            <Route path="/token-manager" element={<TokenManager />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;