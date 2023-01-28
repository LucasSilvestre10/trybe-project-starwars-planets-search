import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import testData from "../../cypress/mocks/testData";
import userEvent from "@testing-library/user-event";
import PlanetsProvider from "../context/PlanetsProvider";
import { FilterProvider, FilterContext } from "../context/FilterProvider";
import useFilter from "../hooks/useFilter";
import { act } from "react-dom/test-utils";
import { wait } from "@testing-library/user-event/dist/utils";

describe("testes componente Table", () => {
  beforeEach(async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(testData),
      })
    );

    await act(async () => {
      render(
       
      <App />
      
      );
    });
  });

  test("testa se componentes são renderizados na tela", async () => {
    const inputFilterName = screen.getAllByTestId("name-filter");
    const selectColumFilter = screen.getAllByTestId("column-filter");
    const selectComparisonFilter = screen.getAllByTestId("comparison-filter");
    const buttonFilter = screen.getAllByTestId("button-filter");
    expect(inputFilterName).toContainElement;
    expect(selectColumFilter).toContainElement;
    expect(selectComparisonFilter).toContainElement;
    expect(buttonFilter).toContainElement;
  });

  test("should first", () => {
    expect(typeof useFilter).toBe("function");
  });

  test("should first", async () => {
    waitFor(() => {
      const searchInput = screen.getAllByTestId("name-filter");
      const columnSelect = screen.getAllByTestId("column-filter");
      const comparisonSelect = screen.getAllByTestId("comparison-filter");
      const numberInput = screen.getAllByTestId("value-filter");
      const filterButton = screen.getAllByTestId("button-filter");

      expect(searchInput).toContainElement();
      expect(columnSelect).toContainElement();
      expect(comparisonSelect).toContainElement();

      const sortSelect = screen.getByRole("combobox", { name: /ordenar/i });
      const sortASCRadio = screen.getByRole("radio", { name: /ascendente/i });
      const sortDESCRadio = screen.getByRole("radio", { name: /descendente/i });
      const sortButton = screen.getByRole("button", { name: /ordenar/i });

      const nameColumnTable = screen.findByRole("columnheader", {
        name: /name/i,
      });
      expect(nameColumnTable).toBeInTheDocument();

      userEvent.selectOptions(sortSelect, "diameter");
      userEvent.click(sortASCRadio);
      userEvent.click(sortButton);

      userEvent.selectOptions(sortSelect, "population");
      userEvent.click(sortDESCRadio);
      userEvent.click(sortButton);

      userEvent.type(searchInput, "ta");
      userEvent.selectOptions(columnSelect, "diameter");
      userEvent.selectOptions(comparisonSelect, "menor que");
      userEvent.type(numberInput, "10");
      userEvent.click(filterButton);

      const removeFirstFilterButton = screen.getByTestId("delete-filter-0");
      userEvent.click(removeFirstFilterButton);

      const removeAllFiltersButton = screen.getByRole("button", {
        name: /remover todos filtros/i,
      });
      userEvent.click(removeAllFiltersButton);
    });
  });

  test('Se o filtro "maior que" esta funcionando', async () => {
    const filterButton = screen.getByTestId('button-filter')
    const filterColumn = screen.getByTestId('column-filter')
    const filterComparison = screen.getByTestId('comparison-filter')
    const filterNumber = screen.getByTestId('value-filter')

    const planet = screen.getByText(/Tatooine/i);
    const planet2 = screen.queryByText(/Alderaan/i);

    expect(planet).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();

    userEvent.selectOptions(filterColumn, 'surface_water')
    userEvent.selectOptions(filterComparison, 'maior que')
    userEvent.type(filterNumber, '10')
    userEvent.click(filterButton)

    expect(planet).not.toBeInTheDocument();
    expect(planet2).toBeInTheDocument();
  })

  test('Se o filtro aparece na pagina com o botão', async () => {
    const filterButton = screen.getByTestId('button-filter')
    const filterColumn = screen.getByTestId('column-filter')
    const filterComparison = screen.getByTestId('comparison-filter')
    const filterNumber = screen.getByTestId('value-filter')

    userEvent.selectOptions(filterColumn, 'surface_water')
    userEvent.selectOptions(filterComparison, 'menor que')
    userEvent.type(filterNumber, '10')
    userEvent.click(filterButton)

    const filter = await screen.findByTestId('filter')
    const xBtn = filter.children[1]

    await waitFor(() => {
      expect(filter).toBeInTheDocument()
      expect(xBtn).toBeInTheDocument()
    })
  });
  
  test('Se o filtro "menor que" esta funcionando', async () => {
    const filterButton = screen.getByTestId('button-filter')
    const filterColumn = screen.getByTestId('column-filter')
    const filterComparison = screen.getByTestId('comparison-filter')
    const filterNumber = screen.getByTestId('value-filter')

    const planet = screen.getByText(/Tatooine/i);
    const planet2 = screen.queryByText(/Alderaan/i);

    expect(planet).toBeInTheDocument();
    expect(planet2).toBeInTheDocument();

    userEvent.selectOptions(filterColumn, 'surface_water')
    userEvent.selectOptions(filterComparison, 'menor que')
    userEvent.type(filterNumber, '10')
    userEvent.click(filterButton)

    expect(planet).toBeInTheDocument();
    expect(planet2).not.toBeInTheDocument();
  })

  test('Se os filtros esta na pagina', async () => {
    const filterButton = screen.getByTestId('button-filter')
    const filterColumn = screen.getByTestId('column-filter')
    const filterComparison = screen.getByTestId('comparison-filter')
    const filterNumber = screen.getByTestId('value-filter')

    expect(filterButton).toBeInTheDocument();
    expect(filterColumn).toBeInTheDocument();
    expect(filterComparison).toBeInTheDocument();
    expect(filterNumber).toBeInTheDocument();
  });

  test('Se esta sendo ordenado corretamente', async () => {
    const orderInput = screen.getByTestId('column-sort')
    const descRadio = screen.getByTestId('column-sort-input-desc')
    const orderBtn = screen.getByTestId('column-sort-button')
    const planets = screen.getAllByTestId('planet-name')

    expect(planets[0]).toHaveTextContent('Tatooine')
    expect(planets[1]).toHaveTextContent('Alderaan')

    userEvent.selectOptions(orderInput, 'orbital_period')
    userEvent.click(descRadio)
    userEvent.click(orderBtn)

    await act( async() => {
      const planets2 = screen.getAllByTestId('planet-name')
      expect(planets2[0]).toHaveTextContent('Bespin')
      expect(planets2[1]).toHaveTextContent('Yavin IV')
    })
  })
  

 
});
