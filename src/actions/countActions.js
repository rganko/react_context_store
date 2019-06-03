import { setColor, setRed } from './currentColorActions';
export function incrementCount() {
  return dispatch => {
    dispatch({ type: 'INCREMENT' });
  };
}

export function decrementCount() {
  return dispatch => {
    dispatch({ type: 'DECREMENT' });
  };
}

export function incrementCountAndSetOrange() {
  return dispatch => {
    dispatch({ type: 'INCREMENT' });
    dispatch(setColor('orange'))
  }
}

export function decrementCountAndSetRed() {
  return dispatch => {
    dispatch({ type: 'DECREMENT' });
    dispatch(setRed())
  }
}