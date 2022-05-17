import React, { useContext, useRef } from 'react';
import { LugaresContext } from '../context/context-lugares/LugaresContext';
import { SearchResult } from './SearchResult';

export const SearchBar = () => {
  const debounceRef = useRef();
  const { searchPlacesByTerm } = useContext(LugaresContext);

  const onQueryChange = (e) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      // Todo buscar o ejecutar consulta
      searchPlacesByTerm(e.target.value);
    }, 500);
  };

  return (
    <div className="search__container">
      <input
        autoComplete="off"
        type="text"
        name="search"
        placeholder="Buscar"
        onChange={onQueryChange}
      />

      <SearchResult />
    </div>
  );
};
