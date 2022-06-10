import {SET_DATA_USER} from '../screens/Login/redux/types';

export const setDataUser = data => {
  return {
    type: SET_DATA_USER,
    data: data,
  };
};
