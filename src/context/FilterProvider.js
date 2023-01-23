/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useFilter from '../hooks/useFilter';
import { PlanetsContext } from './PlanetsProvider';

export const FilterContext = createContext();

function FilterProvider({ children }) {
  const { planets } = useContext(PlanetsContext);
  const { filterByName } = useFilter();
  const [search, setSearch] = useState('');
  const [filteredPlanets, setFilterPlanets] = useState([]);

  useEffect(() => {
    setFilterPlanets(filterByName(planets, search));
  }, [search, planets]);

  const values = useMemo(() => ({
    setSearch, search, filteredPlanets,
  }), [search, filteredPlanets]);

  return (
    <FilterContext.Provider value={ values }>
      { children }
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {}.isRequired;

export default FilterProvider;
