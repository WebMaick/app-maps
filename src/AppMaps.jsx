import React from 'react';
import { LugaresProvider } from './context/context-lugares/LugaresContext';
import { MapProvider } from './context/context-mapas/MapContext';
import { HomeScreen } from './screens/HomeScreen';

export const AppMaps = () => {
  return (
    <LugaresProvider>
      <MapProvider>
        <HomeScreen />
      </MapProvider>
    </LugaresProvider>
  );
};
