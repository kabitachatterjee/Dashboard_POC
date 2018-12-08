import { combineReducers } from 'redux';
import {audiences } from "./AudienceReducers";

const rootReducer = combineReducers({
  audiences,
});

export default rootReducer;
