/* import axios from 'axios';

const directionApis = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token:
      'pk.eyJ1IjoibWFpY2s3NzciLCJhIjoiY2wzOWlvc3BrMDZ5ZjNicGtzbWcxaGtnNCJ9.9OPfZxMCsg7gQ-3U9mDbSg',
  },
});

export default directionApis; */

/* 
 https://api.mapbox.com/directions/v5/mapbox/driving/-68.12113237159957%2C-16.499390835276245%3B-68.13512125606111%2C-16.494266366767306?alternatives=false&geometries=geojson&overview=simplified&steps=false&access_token=pk.eyJ1IjoibWFpY2s3NzciLCJhIjoiY2wzOWlvc3BrMDZ5ZjNicGtzbWcxaGtnNCJ9.9OPfZxMCsg7gQ-3U9mDbSg
*/

import axios from 'axios';

const directionApis = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: true,
    geometries: 'geojson',
    language: 'es',
    overview: 'simplified',
    steps: true,
    access_token:
      'pk.eyJ1IjoibWFpY2s3NzciLCJhIjoiY2wzOWlvc3BrMDZ5ZjNicGtzbWcxaGtnNCJ9.9OPfZxMCsg7gQ-3U9mDbSg',
  },
});

export default directionApis;

/* 
  https://api.mapbox.com/directions/v5/mapbox/driving/-68.12113237159957%2C-16.499390835276245%3B-68.13512125606111%2C-16.494266366767306?alternatives=true&geometries=geojson&language=es&overview=simplified&steps=true&access_token=pk.eyJ1IjoibWFpY2s3NzciLCJhIjoiY2wzOWlvc3BrMDZ5ZjNicGtzbWcxaGtnNCJ9.9OPfZxMCsg7gQ-3U9mDbSg
*/
