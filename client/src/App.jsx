import React, { useState, useEffect } from 'react';
import PlantForm from './components/PlantForm';
import PlantCard from './components/PlantCard';

// Main App component
const App = () => {
  // State to store the list of plants
  const [plants, setPlants] = useState([]);
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);
  // State for error messages
  const [error, setError] = useState('');
  // State for success messages
  const [successMessage, setSuccessMessage] = useState('');

  // Function to simulate fetching plants from a backend API
  useEffect(() => {
    const fetchPlants = async () => {
      setIsLoading(true);
      setError('');
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        // In a real app, this would be a fetch to your Node.js backend:
        // const response = await fetch('/api/plants');
        // const data = await response.json();
        // setPlants(data);

        // Mock data for demonstration
        const mockPlants = [
          {
            id: 'plant1',
            name: 'Tomato Plant',
            images: [
              'https://placehold.co/300x200/FFDDC1/000000?text=Day+1',
              'https://placehold.co/300x200/FFDDC1/000000?text=Day+15',
              'https://placehold.co/300x200/FFDDC1/000000?text=Day+30'
            ]
          },
          {
            id: 'plant2',
            name: 'Basil Plant',
            images: [
              'https://placehold.co/300x200/D1FFDD/000000?text=Week+1',
              'https://placehold.co/300x200/D1FFDD/000000?text=Week+3'
            ]
          }
        ];
        setPlants(mockPlants);
      } catch (err) {
        setError('Failed to fetch plants. Please try again.');
        console.error('Fetch plants error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlants();
  }, []); // Empty dependency array means this runs once on component mount

  // Function to handle adding a new plant (passed to PlantForm)
  const handleAddPlant = async (newPlantName, newPlantImageUrl) => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    if (!newPlantName.trim() || !newPlantImageUrl.trim()) {
      setError('Plant name and image URL cannot be empty.');
      setIsLoading(false);
      return;
    }

    const newPlant = {
      id: `plant${Date.now()}`, // Unique ID for the new plant
      name: newPlantName,
      images: [newPlantImageUrl] // Initial image for the new plant
    };

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 700));
      // In a real app, this would be a POST request to your Node.js backend:
      // const response = await fetch('/api/plants', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newPlant)
      // });
      // const addedPlant = await response.json();
      // setPlants([...plants, addedPlant]);

      setPlants([...plants, newPlant]); // Add new plant to local state
      setSuccessMessage('Plant added successfully!');
    } catch (err) {
      setError('Failed to add plant. Please try again.');
      console.error('Add plant error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle adding a new image to an existing plant (passed to PlantCard)
  const handleAddImage = async (plantId) => {
    const imageUrl = prompt('Enter image URL for this plant:'); // Simple prompt for image URL
    if (!imageUrl || !imageUrl.trim()) {
      setError('Image URL cannot be empty.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 700));
      // In a real app, this would be a PUT request to update the plant:
      // const response = await fetch(`/api/plants/${plantId}/images`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ imageUrl })
      // });
      // const updatedPlant = await response.json();
      // setPlants(plants.map(p => (p.id === plantId ? updatedPlant : p)));

      // Update local state with the new image
      setPlants(plants.map(p =>
        p.id === plantId
          ? { ...p, images: [...p.images, imageUrl] }
          : p
      ));
      setSuccessMessage('Image added successfully!');
    } catch (err) {
      setError('Failed to add image. Please try again.');
      console.error('Add image error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 font-inter p-4 sm:p-6 lg:p-8">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-green-800 mb-2">
          Plant Progress Monitor
        </h1>
        <p className="text-lg text-green-600">
          Track your plants' growth journey with images!
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Add New Plant Section - now a separate component */}
        <PlantForm
          onAddPlant={handleAddPlant}
          isLoading={isLoading}
          error={error}
          successMessage={successMessage}
          setError={setError} // Pass setError to allow form to clear its own errors
          setSuccessMessage={setSuccessMessage} // Pass setSuccessMessage
        />

        {/* Plant List Section */}
        <section className="bg-white p-6 rounded-xl shadow-lg border border-green-200">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">Your Plants</h2>
          {isLoading && !plants.length && (
            <div className="text-center text-gray-600">Loading plants...</div>
          )}
          {!plants.length && !isLoading && !error && (
            <div className="text-center text-gray-600">No plants added yet. Add one above!</div>
          )}
          {error && plants.length === 0 && ( // Only show error if no plants are loaded at all
            <div className="text-center text-red-600">{error}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onAddImage={handleAddImage}
                isLoading={isLoading}
                setError={setError} // Pass setError to PlantCard
                setSuccessMessage={setSuccessMessage} // Pass setSuccessMessage
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;