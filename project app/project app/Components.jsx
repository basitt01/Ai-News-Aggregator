// src/components/ControlPanel.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Search, Server, Sun, Moon } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useDebounce } from '../hooks/useDebounce';

const ControlPanel = () => {
  const { query, setSearchQuery, fetchData } = useData();
  const [inputValue, setInputValue] = useState(query);
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  // Simple state for the aesthetic toggle (only dark implemented)
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Effect to trigger API fetch when the debounced term changes
  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      fetchData(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, fetchData]);

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
    setSearchQuery(e.target.value);
  }, [setSearchQuery]);

  const handleToggle = () => setIsDarkMode(prev => !prev);
  
  return (
    <div className="p-6 h-full flex flex-col space-y-8 bg-container-bg border-r border-primary-neon">
      
      {/* BRANDING */}
      <div className="text-primary-neon text-3xl font-bold font-mono text-shadow-neon-shadow mb-8">
        Aether Command: <span className="text-secondary-accent">AURORA FEED</span>
      </div>

      {/* SEARCH CONTROL */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter Matrix Query..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-transparent text-primary-neon placeholder-gray-500 
                     border border-primary-neon rounded-md shadow-neon-shadow outline-none 
                     focus:ring-2 focus:ring-primary-neon transition duration-200"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-neon" />
      </div>

      {/* THEMATIC CONTROLS */}
      <div className="pt-4 border-t border-secondary-accent/50">
        <h3 className="text-secondary-accent text-xs uppercase font-bold mb-3">System Controls</h3>
        <div className="flex items-center justify-between">
          <span className="text-primary-neon text-sm">Aesthetic Mode:</span>
          <button 
            onClick={handleToggle}
            className={`p-2 rounded-full transition duration-300 ${isDarkMode ? 'bg-primary-neon shadow-neon-shadow' : 'bg-gray-700'}`}
            title="Toggle Theme"
          >
            {isDarkMode ? <Moon className="w-4 h-4 text-matrix-dark" /> : <Sun className="w-4 h-4 text-white" />}
          </button>
        </div>
        <button 
            onClick={() => fetchData(query)}
            className="mt-4 w-full flex items-center justify-center p-2 text-sm text-matrix-dark font-bold 
                       bg-secondary-accent rounded-md shadow-accent-shadow hover:bg-primary-neon transition duration-200"
        >
            <Server className="w-4 h-4 mr-2" />
            REFRESH FEED
        </button>
      </div>

    </div>
  );
};

export default ControlPanel;
