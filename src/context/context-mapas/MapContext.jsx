import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { mapReducer } from './mapReducer';
import { Map, Marker, Popup, LngLatBounds, AnySourceData } from 'mapbox-gl';
import { LugaresContext } from '../context-lugares/LugaresContext';
import directionApis from '../../apis/directionApis';

export const MapContext = createContext();

const initialState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

export const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mapReducer, initialState);
  const { places } = useContext(LugaresContext);

  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());
    const newMarkers = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`
        <h6>${place.text_es}</h6>
        <p>${place.place_name_es}</p>
      `);

      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map);

      newMarkers.push(newMarker);
    }

    // Todo: limpiar polyline
    dispatch({
      type: 'setMarkers',
      payload: newMarkers,
    });
  }, [places]);

  const setMap = (map) => {
    // Colocando Popup
    const myLocationPopup = new Popup().setHTML(`
        <h4>Aqui estoy</h4>
        <p>En algun lugar del mundo</p>
      `);

    // Creando marcadores
    new Marker({ color: 'crimson' })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);

    dispatch({
      type: 'setMap',
      payload: map,
    });
  };

  /* Funcion para generar una ruta */
  const getRouteBetweenPoints = async (start, end) => {
    const resp = await directionApis.get(
      `/${start.join(',')};${end.join(',')}`
    );

    // console.log(resp);
    const { distance, duration, geometry } = resp.data.routes[0];
    const { coordinates: coords } = geometry;

    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms /= 100;
    const minutes = Math.floor(duration / 60);

    // console.log({ kms, minutes });

    /* Graficando la ruta */
    const bounds = new LngLatBounds(start, start);

    for (const coord of coords) {
      const newcord = [coord[0], coord[1]];
      bounds.extend(newcord);
    }

    state?.map.fitBounds(bounds, { padding: 200 });

    //Polyline
    const sourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    };

    // Todo remover polyline si existe
    if (state.map.getLayer('RouteString')) {
      state.map.removeLayer('RouteString');
      state.map.removeSource('RouteString');
    }

    state.map?.addSource('RouteString', sourceData);
    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'teal',
        'line-width': 3,
      },
    });
  };

  return (
    <MapContext.Provider value={{ ...state, setMap, getRouteBetweenPoints }}>
      {children}
    </MapContext.Provider>
  );
};
