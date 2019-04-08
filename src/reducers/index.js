import { combineReducers } from '../store';
import countReducer from './countReducer';
import colorsReducer from './colorsReducer';

export default () => combineReducers({
  count: countReducer,
  colors: colorsReducer,
})

export function getInitialState(reducer) {
  return reducer(undefined, {});
}
