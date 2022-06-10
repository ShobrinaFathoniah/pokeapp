import {SET_ALL_POKEMON} from './types';

const initialState = {
  dataAllPokemon: '',
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_POKEMON:
      return {
        ...state,
        dataAllPokemon: action.allPokemon,
      };
    default:
      return {...state};
  }
};
