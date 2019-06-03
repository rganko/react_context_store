const initialState = {
  currentColor: '#bada55',
  items: [],
  status: null,
  error: null,
  tmp: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'RESET':
      return { ...initialState, items: state.items };
    case 'SET_COLOR':
      return { ...state, currentColor: action.payload };
    case 'FETCH_COLORS_PENDING':
      return { ...state, status: 'PENDING' };
    case 'FETCH_COLORS_FULFILLED':
      return { ...state, status: 'FULFILLED', items: action.payload, error: null };
    case 'FETCH_COLORS_ERROR':
      return { ...state, status: 'FULFILLED', error: action.payload };
    default:
      return state
  }
}
