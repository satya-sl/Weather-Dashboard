import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';

function Navbar({ onCityChange }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (
      savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setIsEnabled(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle theme based on isEnabled value
  useEffect(() => {
    if (isEnabled) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isEnabled]);

  // Handle search input and trigger city change when Enter is pressed
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      onCityChange(searchInput.trim()); // Trigger onCityChange with the search input value
      setSearchInput('');
    }
  };

  // Handle current location click
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onCityChange(`${latitude},${longitude}`); // Use the coordinates for location-based search
        },
        (error) => console.error('Geolocation error:', error)
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-gray-100 to-gray-700 text-white dark:bg-gradient-to-r dark:from-[#2a2a2a] dark:via-[#1f1f1f] dark:to-black dark:text-white">
        <div className="flex items-center justify-between p-4">
          {/* Dark/Light Mode Switch */}
          <div className="flex items-center space-x-2">
            <Switch
              checked={isEnabled}
              onChange={setIsEnabled}
              className={`${
                isEnabled ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span
                className={`${
                  isEnabled ? 'translate-x-5' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full transition`}
              />
            </Switch>
            <span className="text-black dark:text-white">
              {isEnabled ? 'Dark Mode' : 'Light Mode'}
            </span>
          </div>

          {/* Search Input */}
          <div className="relative w-1/2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearch} // Listen for Enter key to trigger search
              placeholder="Search for your preferred city"
              className="w-full p-2 pl-10 pr-3 rounded-md border dark:bg-gray-700 dark:text-white bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>

          {/* Current Location Button */}
          <button
            onClick={handleLocationClick} // Handle current location click
            className="p-2 bg-blue-500 text-white rounded-md flex items-center space-x-2"
          >
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios/50/accuracy--v1.png"
              alt="accuracy--v1"
              className="h-6 w-auto"
            />
            <span>Current Location</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
