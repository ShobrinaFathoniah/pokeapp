import {Alert} from 'react-native';
import axios from 'axios';
import {setIsLoading} from '../../../store/globalAction';
import {SET_DETAIL_POKEMON} from './types';

export const getDetailPokemon = urlDetail => async dispatch => {
  try {
    dispatch(setIsLoading(true));

    const res = await axios.get(`${urlDetail}`);
    console.log(res.data, 'detail');

    if (res.status === 200) {
      dispatch(setIsLoading(false));
      dispatch(setDetailPokemon(res.data));
    }
  } catch (error) {
    dispatch(setIsLoading(false));
    Alert.alert('Pemberitahuan', error);
  }
};

export const setDetailPokemon = data => {
  return {
    type: SET_DETAIL_POKEMON,
    detailPokemon: data,
  };
};
