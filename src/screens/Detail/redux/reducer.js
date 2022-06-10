import {SET_DETAIL_POKEMON} from './types';

const initialState = {
  dataDetail: {},
};

export const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DETAIL_POKEMON:
      return {
        ...state,
        dataDetail: action.detailPokemon,
      };
    default:
      return {...state};
  }
};
