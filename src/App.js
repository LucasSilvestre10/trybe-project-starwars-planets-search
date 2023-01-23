import React from 'react';
import './App.css';
import Home from './pages/Home';
import PlanetsProvider from './context/PlanetsProvider';
import FilterProvider from './context/FilterProvider';

function App() {
  return (
    <PlanetsProvider>
      <FilterProvider>
        <Home />
      </FilterProvider>
    </PlanetsProvider>
  );
}

export default App;
