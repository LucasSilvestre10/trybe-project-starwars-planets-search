/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';

export const PlanetsContext = createContext();

function PlanetsProvider({ children }) {
  const { isLoading, makeFetch, errors } = useFetch();
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    async function fetching(url) {
      const data = await makeFetch(url);

      const cleanedPlanets = data.results.map((planet) => {
        delete planet.residents;
        return planet;
      });

      setPlanets(cleanedPlanets);
    }

    fetching('https://swapi.dev/api/planets');
  }, []);

  const values = useMemo(() => (
    { isLoading, errors, planets }
  ), [isLoading, errors, planets, setPlanets]);

  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;

export default PlanetsProvider;
