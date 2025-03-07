import React, { useState } from 'react';
import { createToken, connectWallet } from '../utils/solanaUtils';
import { Coins, AlertCircle } from 'lucide-react';

const TokenCreator: React.FC = () => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [decimals, setDecimals] = useState(9);
  const [initialSupply, setInitialSupply] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreateToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const isConnected = await connectWallet();
      if (!isConnected) {
        throw new Error('Please connect your Phantom wallet first');
      }

      if (!name || !symbol) {
        throw new Error('Token name and symbol are required');
      }

      if (decimals < 0 || decimals > 9) {
        throw new Error('Decimals must be between 0 and 9');
      }

      if (initialSupply < 0) {
        throw new Error('Initial supply must be non-negative');
      }

      const mintAddress = await createToken(name, symbol, decimals, initialSupply);
      const isVerified = await verifyToken(mintAddress);
      if (!isVerified) {
        throw new Error('Token verification failed');
      }
      setSuccess(`Token created successfully! Mint address: ${mintAddress} (Verified)`);
      setName('');
      setSymbol('');
      setDecimals(9);
      setInitialSupply(0);
    } catch (err) {
      if (err.message.includes('Insufficient funds')) {
        setError('Insufficient SOL in your wallet to create a token. Request Devnet SOL from a faucet.');
      } else if (err.message.includes('Wallet not connected')) {
        setError('Please connect your Phantom wallet.');
      } else {
        setError(err instanceof Error ? err.message : 'Failed to create token');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <Coins className="mx-auto h-12 w-12 text-blue-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create New Token
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your own SPL token on the Solana blockchain
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleCreateToken} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Token Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="My Token"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Token Symbol
              </label>
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="MTK"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Decimals
              </label>
              <input
                type="number"
                value={decimals}
                onChange={(e) => setDecimals(parseInt(e.target.value))}
                min="0"
                max="9"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Initial Supply
              </label>
              <input
                type="number"
                value={initialSupply}
                onChange={(e) => setInitialSupply(parseInt(e.target.value))}
                min="0"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Coins className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      {success}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Creating...' : 'Create Token'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TokenCreator;