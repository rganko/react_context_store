const colorData = ['aqua', 'orange', 'yellow', 'blue', 'chartreuse', 'crimson'];

export function fetchColors() {
  return async (dispatch/*, getState*/) => {
    dispatch({ type: 'FETCH_COLORS_PENDING' });
    try {
      const colors = await new Promise(res => setTimeout(() => res({data: colorData}), 1000));

      dispatch({ type: 'FETCH_COLORS_FULFILLED', payload: colors.data });
    } catch (e) {
      dispatch({ type: 'FETCH_COLORS_ERROR', payload: e.message });
    }
  };
}

export function setColor(color) {
  return { type: 'SET_COLOR', payload: color }
}

export function setRed() {
  return dispatch => {
    dispatch(setColor('red'));
  }
}
