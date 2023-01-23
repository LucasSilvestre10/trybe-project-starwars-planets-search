function useFilter() {
  const filterByName = (array, search) => array.filter(({ name }) => name.toUpperCase()
    .includes(search.toUpperCase()));

  return {
    filterByName,
  };
}

export default useFilter;
