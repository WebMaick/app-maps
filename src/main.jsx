import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppMaps } from './AppMaps';
import './index.css';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFpY2s3NzciLCJhIjoiY2wzOWlvc3BrMDZ5ZjNicGtzbWcxaGtnNCJ9.9OPfZxMCsg7gQ-3U9mDbSg';

if (!navigator.geolocation) {
  alert('Tu navegador no tiene acceso a geolocation');
  throw new Error('Tu navegador no tiene acceso a geolocation');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppMaps />
  </React.StrictMode>
);
