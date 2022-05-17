import React, { useContext, useLayoutEffect, useRef } from 'react';
import { LugaresContext } from '../context/context-lugares/LugaresContext';
import { Loading } from './Loading';
import { Map } from 'mapbox-gl';
import { MapContext } from '../context/context-mapas/MapContext';

export const MapView = () => {
  const { setMap } = useContext(MapContext);

  const { isLoading, userLocation } = useContext(LugaresContext);
  const mapDiv = useRef(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current, // container ID
        // style: 'mapbox://styles/mapbox/streets-v11', // style URL MODO INICIAL
        // style: 'mapbox://styles/mapbox/light-v10', // style URL MODO LIGTH
        style: 'mapbox://styles/mapbox/dark-v10', // style URL MODO DARK
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
      });

      setMap(map);
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  //console.log({ isLoading }, { userLocation });

  return (
    <div ref={mapDiv} className="map__container">
      {/* <h2>MapView</h2>
      <p>{userLocation?.join(',')}</p> */}
    </div>
  );
};
