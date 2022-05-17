import { createContext, useEffect, useReducer } from 'react';
import searchApi from '../../apis/searchApi';
import { getUserLocation } from '../../helpers/getUserLocation';
import { lugaresReducer } from './lugaresReducer';

export const LugaresContext = createContext();

const initialState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
};

export const LugaresProvider = ({ children }) => {
  const [state, dispatch] = useReducer(lugaresReducer, initialState);

  useEffect(() => {
    getUserLocation().then((lngLat) =>
      dispatch({ type: 'setUserLocation', payload: lngLat })
    );
  }, []);

  const searchPlacesByTerm = async (query) => {
    if (query.length === 0) {
      dispatch({
        type: 'setPlaces',
        payload: [],
      });
      return [];
    }
    if (!state.userLocation) throw new Error('No hay ubicacion del usuario');

    dispatch({
      type: 'setLoadingPlaces',
    });

    const resp = await searchApi.get(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(','),
      },
    });

    //console.log(resp.data.features[0]);
    dispatch({
      type: 'setPlaces',
      payload: resp.data.features,
    });

    return resp.data.features;
  };

  return (
    <LugaresContext.Provider value={{ ...state, searchPlacesByTerm }}>
      {children}
    </LugaresContext.Provider>
  );
};
