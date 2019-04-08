import React from 'react';
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

export default function Provider({ store, children }){
  let [state, dispatch] = React.useReducer(store.reducer, store.initialState);
  let value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
};

export { connect, configureStore }
