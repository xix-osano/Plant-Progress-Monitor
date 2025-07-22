import React, { useState } from 'react';

const PlantForm = ({ onAddPlant, isLoading, error, successMessage, setError, setSuccessMessage }) => {
  const [newPlantName, setNewPlantName] = useState('');
  const [newPlantImageUrl, setNewPlantImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear previous messages before new submission
    setError('');
    setSuccessMessage('');
    await onAddPlant(newPlantName, newPlantImageUrl);
    // Only clear inputs if the add was successful (handled by parent's successMessage)
    if (!error) { // Check error state after onAddPlant completes
      setNewPlantName('');
      setNewPlantImageUrl('');
    }
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-green-200">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Add New Plant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="plantName" className="block text-sm font-medium text-gray-700 mb-1">
            Plant Name
          </label>
          <input
            type="text"
            id="plantName"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-200"
            value={newPlantName}
            onChange={(e) => setNewPlantName(e.target.value)}
            placeholder="e.g., Sunflower, Orchid"
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Initial Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-200"
            value={newPlantImageUrl}
            onChange={(e) => setNewPlantImageUrl(e.target.value)}
            placeholder="e.g., https://example.com/plant-day1.jpg"
            required
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Adding Plant...' : 'Add Plant'}
        </button>
      </form>
    </section>
  );
};

export default PlantForm;