import {baseUrl} from '@env';
import {Alert} from 'react-native';
import axios from 'axios';
import {setIsLoading} from '../../../store/globalAction';
import {SET_ALL_POKEMON} from './types';

export const getAllPokemon = newUrl => async dispatch => {
  try {
    dispatch(setIsLoading(true));

    if (newUrl) {
      const res = await axios.get(`${newUrl}`);

      if (res.status === 200) {
        dispatch(setIsLoading(false));
        dispatch(setAllPokemon(res.data));
      }
    } else {
      const res = await axios.get(`${baseUrl}/pokemon`);

      if (res.status === 200) {
        dispatch(setIsLoading(false));
        dispatch(setAllPokemon(res.data));
      }
    }
  } catch (error) {
    dispatch(setIsLoading(false));
    Alert.alert('Pemberitahuan', error);
  }
};

export const setAllPokemon = data => {
  return {
    type: SET_ALL_POKEMON,
    allPokemon: data,
  };
};
