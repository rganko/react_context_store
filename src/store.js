import React from 'react';
import isFunction from 'lodash/isFunction';

import createRootReducer, { getInitialState } from './reducers';

const StoreContext = React.createContext();

const getMapStateToProps = mapDispatchToProps => (state, props) => (isFunction(mapDispatchToProps)
  ? mapDispatchToProps(state, props) : {})
;

const dispatchHandler = dispatch => {
  return dispatchedElement => isFunction(dispatchedElement)
    ? dispatchedElement(dispatch) : dispatch(dispatchedElement);
};

const getMapDispatchToProps = mapDispatchToProps => dispatch => ({
  ...(isFunction(mapDispatchToProps) ? mapDispatchToProps(dispatchHandler(dispatch)) : {}),
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
            { ...getMapDispatchToProps(mapDispatchToProps)(dispatch) }
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
