export function incrementCount() {
  return dispatch => {
    dispatch({ type: 'INCREMENT' });
  };
}