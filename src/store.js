import React, { useReducer } from 'react';
import isEmpty from 'lodash/isEmpty';
import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';

import createRootReducer from './reducers';

const StoreContext = React.createContext();

const getMapStateToProps = mapDispatchToProps => (state, props) => (isFunction(mapDispatchToProps)
  ? mapDispatchToProps(state, props) : {});

const dispatchHandler = (dispatch, state) => {
  return dispatchedElement => isFunction(dispatchedElement)
    ? dispatchedElement(dispatch, () => state) : dispatch(dispatchedElement);
};

const getMapDispatchToProps = mapDispatchToProps => (dispatch, state) => {
  if (isFunction(mapDispatchToProps)) {
    return {
      ...mapDispatchToProps(dispatchHandler(dispatch, state)),
      dispatch
    }
  }

  if (isPlainObject(mapDispatchToProps)) {
    const handler = {
      get: function(obj, prop) {
        return (...args) => {
          isFunction(obj[prop](...args))
              ? obj[prop](...args)(dispatch, () => state)
              : dispatch(obj[prop](...args));
        }
      },
    };
    return ({
      ...(new Proxy(mapDispatchToProps, handler)),
      dispatch
    })
  }

  return {
    dispatch,
  };
};

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

const getInitialState = (reducer) => reducer(undefined, {});

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

const combineReducers = reducers => {
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
  let [state, dispatch] = useReducer(store.reducer, store.initialState);
  let value = { state, dispatch: dispatchHandler(dispatch, state) };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
};

const compose = (...funcs) =>
    funcs.reduce((acc, currentValue) => (...args) => acc(currentValue(...args)), arg => arg);

export { connect, configureStore, combineReducers, compose };
