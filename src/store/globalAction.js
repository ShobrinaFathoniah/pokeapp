import {SET_LOADING, SET_REFRESHING} from './globalTypes';

export const setIsLoading = status => {
  return {
    type: SET_LOADING,
    status,
  };
};

export const setRefreshing = refresh => {
  return {
    type: SET_REFRESHING,
    refresh,
  };
};
