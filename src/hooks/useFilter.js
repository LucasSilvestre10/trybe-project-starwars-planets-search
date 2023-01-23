function useFilter() {
  const filterByName = (array, search) => array.filter(({ name }) => name.toUpperCase()
    .includes(search.toUpperCase()));

  const filterByNumbers = ({ column, comparison, valueFilter }, array) => (
    array.filter((planet) => {
      switch (comparison) {
      case 'igual a':
        return +(valueFilter) === +(planet[column]);
      case 'maior que':
        return +(valueFilter) < +(planet[column]);
      case 'menor que':
        return +(valueFilter) > +(planet[column]);
      default:
        throw new Error();
      }
    }));

  return {
    filterByName,
    filterByNumbers,
  };
}

export default useFilter;
