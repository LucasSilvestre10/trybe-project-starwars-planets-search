/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useFilter from '../hooks/useFilter';
import { PlanetsContext } from './PlanetsProvider';

export const FilterContext = createContext();

function FilterProvider({ children }) {
  const { planets } = useContext(PlanetsContext);
  const { filterByName, filterByNumbers } = useFilter();
  const [search, setSearch] = useState('');
  const [filteredPlanets, setFilterPlanets] = useState([]);
  const [filterNumbers, setFilterNumbers] = useState({
    column: 'population',
    comparison: 'maior que',
    valueFilter: '0',
  });
  const [selectFilters, setSelectFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  useEffect(() => {
    setFilterPlanets(filterByName(planets, search));
  }, [search, planets]);

  function clickFilter() {
    setFilterPlanets(filterByNumbers(filterNumbers, filteredPlanets));
    setSelectFilter(
      selectFilters.filter((filter) => filter !== filterNumbers.column),
    );
    setFilterNumbers({
      column: 'population',
      comparison: 'maior que',
      valueFilter: '0',
    });
  }

  function handleChange({ target: { name, value } }) {
    setFilterNumbers({
      ...filterNumbers,
      [name]: value,
    });
  }

  const values = useMemo(() => ({
    setSearch,
    search,
    filteredPlanets,
    filterNumbers,
    handleChange,
    clickFilter,
    selectFilters,
  }), [search, filteredPlanets, filterNumbers, selectFilters]);

  return (
    <FilterContext.Provider value={ values }>
      { children }
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {}.isRequired;

export default FilterProvider;
