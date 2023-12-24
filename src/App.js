import React, { useState, useEffect } from 'react';

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    // Fetch countries on initial render
    fetchCountries();
  }, []);

  useEffect(() => {
    // Fetch states when selectedCountry changes
    if (selectedCountry) {
      fetchStates(selectedCountry);
    }
  }, [selectedCountry]);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://crio-location-selector.onrender.com/countries');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStates = async (countryName) => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error(`Error fetching states for ${countryName}:`, error);
    }
  };

  const fetchCities = async (countryName, stateName) => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`);
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error(`Error fetching cities for ${countryName}, ${stateName}:`, error);
    }
  };

  const handleCountryChange = (e) => {
    const countryName = e.target.value;
    setSelectedCountry(countryName);
    setSelectedState('');
    setSelectedCity('');
  };

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    setSelectedCity('');
    fetchCities(selectedCountry, stateName);
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
  };

  return (
    <div>
      <h1>Location Selector</h1>
      <div>
        <label>Select Country:</label>
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">-- Select Country --</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      {selectedCountry && (
        <>
          <div>
            <label>Select State:</label>
            <select value={selectedState} onChange={handleStateChange}>
              <option value="">-- Select State --</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Select City:</label>
            <select value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
              <option value="">-- Select City --</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          {selectedCity && (
            <div>
              <p>You Selected {selectedCity}, {selectedState}, {selectedCountry}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LocationSelector;
