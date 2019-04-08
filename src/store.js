import React from 'react';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';

import createRootReducer, { getInitialState } from './reducers';

const StoreContext = React.createContext();

const getMapStateToProps = mapDispatchToProps => (state, props) => (isFunction(mapDispatchToProps)
  ? mapDispatchToProps(state, props) : {});

const dispatchHandler = (dispatch, state) => {
  return dispatchedElement => isFunction(dispatchedElement)
    ? dispatchedElement(dispatch, () => state) : dispatch(dispatchedElement);
};

const getMapDispatchToProps = mapDispatchToProps => (dispatch, state) => ({
  ...(isFunction(mapDispatchToProps) ? mapDispatchToProps(dispatchHandler(dispatch, state)) : {}),
  dispatch,
});

const connect = (mapStateToProps, mapDispatchToProps) => WrappedComponent => {
  return function(props) {
    return (
      <StoreContext.Consumer>
        {({ state, dispatch }) => (
          <WrappedComponent
            { ...getMapStateToProps(mapStateToProps)(state, props) }
            { ...props }
            { ...getMapDispatchToProps(mapDispatchToProps)(dispatch, state) }
          />
        )}
      </StoreContext.Consumer>
    )
  }
};

const configureStore = (preLoadedState = {}) => {
  // combine preLoadedState and reducers
  const reducer = createRootReducer();
  const initialState = getInitialState(reducer);

  return { initialState: { ...initialState, ...preLoadedState }, reducer };
};

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

export default function Provider({ store, children }){
  let [state, dispatch] = React.useReducer(store.reducer, store.initialState);
  let value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
};

export { connect, configureStore, combineReducers }
