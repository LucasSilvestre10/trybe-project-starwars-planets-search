import React, { useContext } from 'react';
import Loading from '../components/Loading';
import Table from '../components/Table';
import { PlanetsContext } from '../context/PlanetsProvider';

function Home() {
  const { isLoading } = useContext(PlanetsContext);
  return (
    <main>
      {isLoading ? <Loading /> : <Table />}
    </main>
  );
}

export default Home;
