import React, { useState } from 'react';
import Navbar from './Navbar';
import Content from './Content';

function App() {
  const [city, setCity] = useState('London'); // default city can be set here

  // Handle city change (called from Navbar)
  const handleCityChange = (newCity) => {
    setCity(newCity);
  };

  return (
    <div className="App">
      {/* Navbar with city change handler */}
      <Navbar onCityChange={handleCityChange} />
      {/* Content passes the current city to display its weather */}
      <Content city={city} />
    </div>
  );
}

export default App;
