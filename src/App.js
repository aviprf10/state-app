import React, { useState, useEffect } from 'react';

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    // Fetch countries on initial render
    fetchCountries();
  }, []);

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
    setSelectedLocation('');

    // Fetch states for the selected country
    fetchStates(countryName);
  };

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    setSelectedCity('');
    setSelectedLocation('');

    // Fetch cities for the selected country and state
    fetchCities(selectedCountry, stateName);
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
    setSelectedLocation(`You Selected ${cityName}, ${selectedState}, ${selectedCountry}`);
  };

  return (
    <div>
      <h1>Location Selector</h1>
      <div>
        <label>Select Country:</label>
        <select data-testid="select-country" value={selectedCountry} onChange={handleCountryChange}>
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
            <select data-testid="select-state" value={selectedState} onChange={handleStateChange}>
              <option value="">-- Select State --</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          {selectedState && (
            <>
              <div>
                <label>Select City:</label>
                <select data-testid="select-city" value={selectedCity} onChange={handleCityChange}>
                  <option value="">-- Select City --</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              {selectedLocation && (
                <div data-testid="selected-location">
                  <p>{selectedLocation}</p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default LocationSelector;
