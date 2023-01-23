import React, { useContext } from 'react';
import { FilterContext } from '../context/FilterProvider';

function Table() {
  const {
    search,
    setSearch,
    filteredPlanets,
    filterNumbers: { valueFilter },
    handleChange,
    clickFilter,
  } = useContext(FilterContext);

  return (
    <>
      <input
        id="input-filter-name"
        type="text"
        onChange={ ({ target }) => setSearch(target.value) }
        value={ search }
        data-testid="name-filter"
      />
      <select
        id="select-column-filter"
        name="column"
        onChange={ handleChange }
        data-testid="column-filter"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        id="select-column-filter"
        onChange={ handleChange }
        name="comparison"
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        id="input-value-number-filter"
        name="valueFilter"
        type="number"
        value={ valueFilter }
        onChange={ handleChange }
        data-testid="value-filter"
      />
      <button
        id="button-filter"
        onClick={ clickFilter }
        data-testid="button-filter"
      >
        FILTER
      </button>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map(({
            name,
            rotation_period: rotationPeriod,
            orbital_period: orbitalPeriod,
            diameter,
            climate,
            gravity,
            terrain,
            surface_water: surfaceWater,
            population,
            films,
            created,
            edited,
            url,
          }) => (
            <tr key={ name }>
              <td>{name}</td>
              <td>{rotationPeriod}</td>
              <td>{orbitalPeriod}</td>
              <td>{diameter}</td>
              <td>{climate}</td>
              <td>{gravity}</td>
              <td>{terrain}</td>
              <td>{surfaceWater}</td>
              <td>{population}</td>
              <td>{films}</td>
              <td>{created}</td>
              <td>{edited}</td>
              <td>{url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>

  );
}

export default Table;
