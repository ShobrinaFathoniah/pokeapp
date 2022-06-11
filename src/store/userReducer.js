import {SET_DATA_USER} from '../screens/Login/redux/types';

const initialState = {
  _user: {},
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_USER:
      return {
        ...state,
        _user: action.data,
      };
    default:
      return state;
  }
};
export default UserReducer;
