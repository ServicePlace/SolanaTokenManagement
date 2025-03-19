import React, { useState, useEffect } from 'react';
import type { CustomLogic as CustomLogicType } from '../types';
import { Code, Save } from 'lucide-react';

const CustomLogic: React.FC = () => {
  const [logic, setLogic] = useState<CustomLogicType>({
    name: '',
    description: '',
    code: '',
    type: 'reward',
  });
  const [savedLogic, setSavedLogic] = useState<CustomLogicType[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedLogic = localStorage.getItem('customLogic');
      if (storedLogic) {
        setSavedLogic(JSON.parse(storedLogic));
      }
    } catch (e) {
      setError('Failed to load saved logic');
      console.error(e);
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setError(null);
    try {
      const updatedLogic = [...savedLogic, logic];
      setSavedLogic(updatedLogic);
      localStorage.setItem('customLogic', JSON.stringify(updatedLogic));
      alert('Custom logic saved successfully!');
    } catch (e) {
      setError('Failed to save logic');
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Code className="h-8 w-8 text-blue-500" />
          <h2 className="ml-3 text-2xl font-bold text-gray-900">
            Custom Logic Builder
          </h2>
        </div>

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={logic.name}
                  onChange={(e) => setLogic({ ...logic, name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="My Custom Logic"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={logic.description}
                  onChange={(e) =>
                    setLogic({ ...logic, description: e.target.value })
                  }
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe what your custom logic does..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  value={logic.type}
                  onChange={(e) =>
                    setLogic({
                      ...logic,
                      type: e.target.value as CustomLogicType['type'],
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="reward">Reward System</option>
                  <option value="pool">Token Pool</option>
                  <option value="lottery">Lottery</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Code
                </label>
                <div className="mt-1 bg-gray-50 rounded-md">
                  <textarea
                    value={logic.code}
                    onChange={(e) => setLogic({ ...logic, code: e.target.value })}
                    rows={10}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 font-mono text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="// Write your custom token logic here..."
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
                >
                  {isSaving ? (
                    'Saving...'
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Logic
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomLogic;