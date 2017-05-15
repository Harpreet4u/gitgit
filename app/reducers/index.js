import { combineReducers } from 'redux';
import * as gitReducer from './git_reducer';

export default combineReducers(Object.assign(
  gitReducer,
));
