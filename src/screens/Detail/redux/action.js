import {Alert} from 'react-native';
import axios from 'axios';
import {setIsLoading} from '../../../store/globalAction';
import {SET_CATCH_MONS, SET_DETAIL_POKEMON} from './types';
import {myDb} from '../../../utils/db';
import {setDataUser} from '../../../store/userAction';

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

export const saveCatchMons =
  (userId, prevMonsData, monsData) => async dispatch => {
    try {
      dispatch(setIsLoading(true));

      if (prevMonsData) {
        await myDb.ref(`users/${userId}`).update({
          catchMons: [...prevMonsData, monsData],
        });
      } else {
        await myDb.ref(`users/${userId}`).update({
          catchMons: [monsData],
        });
      }

      const results = await myDb.ref(`users/${userId}`).once('value');
      console.log(results);
      if (results.val()) {
        dispatch(setDataUser(results.val()));
        dispatch(setIsLoading(false));
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

export const setCatchMons = data => {
  return {
    type: SET_CATCH_MONS,
    catchMons: data,
  };
};
