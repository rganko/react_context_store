import isEmpty from 'lodash/isEmpty';

import countReducer from './countReducer';
import colorsReducer from './colorsReducer';

const isDevelopment = process.env.NODE_ENV !== 'production';

const stateLogger = (action, newState) => {
  try {
    if (isEmpty(action)) {
      console.info("%cInit State: ", "color: green", newState);
      return;
    }
    console.info("%caction: ", "color: red", action);
    console.info("%cnewState: ", "color: green", newState);
    console.info('')
  } catch(e) {}
};

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    const newState = Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
        );
        return nextState
      },
      {});
    if (isDevelopment) {
      stateLogger(action, newState);
    }

    return newState;
  }
};

export default () => combineReducers({
  count: countReducer,
  colors: colorsReducer,
})

export function getInitialState(reducer) {
  return reducer(undefined, {});
}
