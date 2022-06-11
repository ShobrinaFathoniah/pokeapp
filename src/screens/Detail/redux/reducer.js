import {SET_CATCH_MONS, SET_DETAIL_POKEMON} from './types';

const initialState = {
  dataDetail: {
    sprites: {
      front_shiny: '',
    },
    stats: [
      {base_stat: ''},
      {base_stat: ''},
      {base_stat: ''},
      {base_stat: ''},
      {base_stat: ''},
      {base_stat: ''},
    ],
    species: {
      name: '',
    },
    moves: [],
  },
  catchMons: {},
};

export const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DETAIL_POKEMON:
      return {
        ...state,
        dataDetail: action.detailPokemon,
      };
    case SET_CATCH_MONS:
      return {
        ...state,
        catchMons: action.catchMons,
      };
    default:
      return {...state};
  }
};
