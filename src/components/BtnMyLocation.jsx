import React, { useContext } from 'react';
import { LugaresContext } from '../context/context-lugares/LugaresContext';
import { MapContext } from '../context/context-mapas/MapContext';

export const BtnMyLocation = () => {
  const { map, isMapReady } = useContext(MapContext);
  const { userLocation } = useContext(LugaresContext);

  const onclick = () => {
    if (!isMapReady) throw new Error('Mapa no esta listo');
    if (!userLocation) throw new Error('No existe ubicacion de Usuario');

    map?.flyTo({
      zoom: 14,
      center: userLocation,
    });
  };

  return (
    <button className="btn btn-primary" onClick={onclick}>
      Mi Ubicación
    </button>
  );
};
