import axios from 'axios';

const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    language: 'es',
    access_token:
      'pk.eyJ1IjoibWFpY2s3NzciLCJhIjoiY2wzOWlvc3BrMDZ5ZjNicGtzbWcxaGtnNCJ9.9OPfZxMCsg7gQ-3U9mDbSg',
  },
});

export default searchApi;

/* 
  https://api.mapbox.com/geocoding/v5/mapbox.places/estadio.json?proximity=-68.12362589738076%2C-16.49912683993945&types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1IjoibWFpY2s3NzciLCJhIjoiY2wzOWlvc3BrMDZ5ZjNicGtzbWcxaGtnNCJ9.9OPfZxMCsg7gQ-3U9mDbSg
*/
