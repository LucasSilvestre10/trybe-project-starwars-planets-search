# Star Wars Planets Search

## Descrição do Projeto
Este repositório contém a implementação do projeto Star Wars Planets Search, desenvolvido como parte do curso da Trybe. O projeto consiste em criar uma lista de planetas do universo de Star Wars com filtros utilizando Context API e Hooks do React para gerenciar estados globais.

### Requisitos Implementados
1. **Requisito 1:** Realizada requisição para o endpoint /planets da API de Star Wars, preenchendo uma tabela com os dados retornados, excluindo os dados da coluna residents.

2. **Requisito 2:** Criado um filtro de texto para a tabela, permitindo a atualização dinâmica dos planetas à medida que o nome é digitado.

3. **Requisito 3:** Implementado um filtro para valores numéricos, com três seletores, permitindo filtrar os dados da tabela de acordo com a coluna correspondente e os valores escolhidos.

4. **Requisito 4:** Adicionada a funcionalidade de múltiplos filtros numéricos, permitindo a aplicação conjunta de vários filtros.

5. **Requisito 5:** Desenvolvidos testes unitários para atingir 30% de cobertura total da aplicação, utilizando React Testing Library.

6. **Requisito 6:** Evitada a utilização de filtros repetidos, carregando um novo filtro de valores numéricos apenas se necessário.

7. **Requisito 7:** Adicionado botão para apagar um filtro de valor numérico, além de um botão para remover todas as filtragens numéricas simultaneamente.

8. **Requisito 8:** Desenvolvidos testes unitários para atingir 60% de cobertura total da aplicação.

9. **Requisito 9:** Implementada a ordenação das colunas de forma ascendente ou descendente, com um dropdown para selecionar a coluna e radio buttons para determinar a ordem. Adicionado um botão para submeter a ordenação.

### Habilidades Técnicas
- Utilização da Context API do React para gerenciamento de estado.
- Utilização dos React Hooks useState, useContext e useEffect.
- Criação de React Hooks customizados.
- Escrita de testes unitários com React Testing Library.

### Tecnologias Utilizadas
- React
- Context API
- React Hooks
- React Testing Library
