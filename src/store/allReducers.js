import {combineReducers} from 'redux';
import UserReducer from './userReducer';
import {globalReducer} from './globalReducer';
import {homeReducer} from '../screens/Home/redux/reducer';

export const allReducers = combineReducers({
  user: UserReducer,
  global: globalReducer,
  home: homeReducer,
});
