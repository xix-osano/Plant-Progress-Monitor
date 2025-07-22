import React from 'react';

const PlantCard = ({ plant, onAddImage, isLoading, setError, setSuccessMessage }) => {

  const handleAddImageClick = () => {
    // Clear previous messages before new submission
    setError('');
    setSuccessMessage('');
    onAddImage(plant.id);
  };

  return (
    <div className="bg-green-50 p-5 rounded-lg shadow-md border border-green-100 flex flex-col">
      <h3 className="text-xl font-bold text-green-800 mb-3">{plant.name}</h3>
      <div className="flex flex-wrap gap-3 mb-4 justify-center">
        {plant.images.length > 0 ? (
          plant.images.map((image, index) => (
            <div key={index} className="relative group rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <img
                src={image}
                alt={`${plant.name} progress ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = `https://placehold.co/300x200/CCCCCC/333333?text=Image+Error`;
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-medium">Image {index + 1}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center w-full">No images yet.</div>
        )}
      </div>
      <button
        onClick={handleAddImageClick}
        className="mt-auto bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? 'Adding Image...' : 'Add New Image'}
      </button>
    </div>
  );
};

export default PlantCard;