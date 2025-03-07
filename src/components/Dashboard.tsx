import React from 'react';
import { Link } from 'react-router-dom';
import { Coins, Settings, Code, LogOut } from 'lucide-react';

interface DashboardProps {
  setAuth: (auth: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setAuth }) => {
  const handleLogout = () => {
    setAuth(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Coins className="h-8 w-8 text-blue-500" />
              <h1 className="ml-2 text-xl font-bold text-gray-800">
                Solana Token Manager
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <LogOut className="h-5 w-5 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link to="/create-token" className="block">
              <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <Coins className="h-8 w-8 text-blue-500" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Create Token
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Create a new SPL token with custom properties
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/manage-tokens" className="block">
              <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <Settings className="h-8 w-8 text-blue-500" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Manage Tokens
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        View and manage your existing tokens
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/custom-logic" className="block">
              <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <Code className="h-8 w-8 text-blue-500" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Custom Logic
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Create reward systems and token utilities
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;