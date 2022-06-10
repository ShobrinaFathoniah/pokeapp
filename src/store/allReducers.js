import {combineReducers} from 'redux';
import UserReducer from './userReducer';
import {globalReducer} from './globalReducer';

export const allReducers = combineReducers({
  user: UserReducer,
  global: globalReducer,
});
