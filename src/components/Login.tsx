import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validatePassword } from '../utils/auth';
import { Coins, Lock } from 'lucide-react';

const Login: React.FC<{ setAuth: (auth: boolean) => void }> = ({ setAuth }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (validatePassword(password)) {
      setAuth(true);
      navigate('/dashboard');
    } else {
      setError('Invalid password');
    }
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Coins className="w-12 h-12 text-blue-500" />
          <h1 className="text-3xl font-bold ml-3 text-gray-800">Solana Token Manager</h1>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
              />
              <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Login
          </button>

          <div className="mt-6 text-sm text-gray-600">
            <p className="font-medium mb-2">Security Notice:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Never share your wallet's private key</li>
              <li>Always verify transaction details before signing</li>
              <li>Use a secure internet connection</li>
            </ul>
            <p className="mt-4 text-xs">
              By using this platform, you acknowledge that you are responsible for maintaining proper security measures.
              We are not liable for any losses due to compromised credentials or improper usage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;