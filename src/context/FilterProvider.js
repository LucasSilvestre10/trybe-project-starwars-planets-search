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
  const [listFilters, setlistFilters] = useState([]);
  const [filters, setFilters] = useState({
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
    const id = listFilters.length;
    filters.id = id;
    setlistFilters([
      ...listFilters,
      filters,
    ]);
    setFilterPlanets(filterByNumbers(filters, filteredPlanets));
    setSelectFilter(
      selectFilters.filter((filter) => filter !== filters.column),

    );
    setFilters({
      column: 'population',
      comparison: 'maior que',
      valueFilter: '0',
    });
  }

  function deleteFilter(event) {
    const array = listFilters.filter((filter) => +filter.id !== +event.target.id);

    setlistFilters(
      array,
    );
    let result = planets;
    for (let index = 0; index < array.length; index += 1) {
      result = filterByNumbers(listFilters[index], result);
      console.log('result', result);
    }
    setFilterPlanets(result);
  }

  function deletAllFilters() {
    setlistFilters([]);
    setFilters({
      column: 'population',
      comparison: 'maior que',
      valueFilter: '0',
    });
    setFilterPlanets(planets);
  }

  function handleChange({ target: { name, value } }) {
    setFilters({
      ...filters,
      [name]: value,
    });
  }

  const values = useMemo(() => ({
    setSearch,
    search,
    filteredPlanets,
    filters,
    handleChange,
    clickFilter,
    selectFilters,
    listFilters,
    deleteFilter,
    deletAllFilters,
  }), [search, filteredPlanets, filters, selectFilters, listFilters]);

  return (
    <FilterContext.Provider value={ values }>
      { children }
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {}.isRequired;

export default FilterProvider;
