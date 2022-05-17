import React, { useContext, useState } from 'react';
import { LugaresContext } from '../context/context-lugares/LugaresContext';
import { MapContext } from '../context/context-mapas/MapContext';
import { AlertLugares } from './AlertLugares';

export const SearchResult = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(LugaresContext);
  const { map, getRouteBetweenPoints } = useContext(MapContext);

  const [activeId, setActiveId] = useState('');

  if (isLoadingPlaces) {
    return <AlertLugares />;
  }

  if (places.lenth === 0) {
    return <></>;
  }

  const onPlaceClick = (place) => {
    const [lng, lat] = place.center;
    setActiveId(place.id);
    map?.flyTo({
      zoom: 14,
      center: [lng, lat],
    });
  };

  /* LLamando los nuevos valores de inicio a fin */
  const getRoute = (place) => {
    if (!userLocation) return;

    const [lng, lat] = place.center;
    getRouteBetweenPoints(userLocation, [lng, lat]);
  };

  return (
    <ul className="search__content">
      {places.map((place) => (
        <li
          className={`${activeId === place.id ? 'active__place' : ''}`}
          key={place.id}
          onClick={() => onPlaceClick(place)}
        >
          <h6>{place.text_es}</h6>
          <p>{place.place_name}</p>
          <button
            className="btn-primary-outline"
            onClick={() => getRoute(place)}
          >
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  );
};
