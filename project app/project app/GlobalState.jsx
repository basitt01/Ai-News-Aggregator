import React, { createContext, useReducer, useEffect, useContext, useCallback, useState } from 'react';
const API_URL = 'http://localhost:5000';

// --- INITIAL STATE & REDUCER ---
const initialState = {
  articles: [],
  loading: true,
  error: null,
  searchTerm: '',
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, articles: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload, articles: [] };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};

// --- CONTEXT CREATION ---
const DataContext = createContext(initialState);

// --- PROVIDER COMPONENT ---
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const [query, setQuery] = useState(state.searchTerm);

  // Function to perform the fetch operation
  const fetchData = useCallback(async (searchQuery = '') => {
    dispatch({ type: 'FETCH_START' });
    const endpoint = searchQuery 
      ? `${API_URL}/news/search?q=${searchQuery}` 
      : `${API_URL}/news`;
    
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.message || data.error || 'Unknown API Error');
      }

      // Filter out articles that failed AI analysis
      const successfulArticles = data.filter(item => !item.analysis.error);
      
      dispatch({ type: 'FETCH_SUCCESS', payload: successfulArticles });
    } catch (error) {
      console.error("Data Fetch Error:", error);
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  }, []);

  // Effect for initial fetch (Top Headlines)
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Expose the debounced search term setter to ControlPanel
  const setSearchQuery = useCallback((term) => {
    setQuery(term);
  }, []);

  return (
    <DataContext.Provider value={{
      ...state,
      fetchData,
      setSearchQuery,
      query,
    }}>
      {children}
    </DataContext.Provider>
  );
};

// --- HOOK FOR CONSUMING CONTEXT ---
export const useData = () => useContext(DataContext);
