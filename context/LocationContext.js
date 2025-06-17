import React, { createContext, useState, useContext, useEffect } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [savedLocations, setSavedLocations] = useState([
    {
      id: 1,
      name: 'Home',
      address: '123 Main Street, Mumbai',
      coordinates: { latitude: 19.0760, longitude: 72.8777 }
    },
    {
      id: 2,
      name: 'Office',
      address: 'Tech Park, Bangalore',
      coordinates: { latitude: 12.9716, longitude: 77.5946 }
    }
  ]);

  // Mock current location for development
  useEffect(() => {
    // Simulating getting user's location
    const mockCurrentLocation = {
      latitude: 19.0760,
      longitude: 72.8777,
      address: 'Mumbai, Maharashtra'
    };
    setLocation(mockCurrentLocation);
    setSelectedLocation(mockCurrentLocation);
  }, []);

  const addSavedLocation = (newLocation) => {
    setSavedLocations(prev => [
      ...prev,
      {
        id: Date.now(),
        ...newLocation
      }
    ]);
  };

  const updateSelectedLocation = (location) => {
    setSelectedLocation(location);
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        locationPermission,
        selectedLocation,
        savedLocations,
        addSavedLocation,
        updateSelectedLocation
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
