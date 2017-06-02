const lotecation = (state = {lat: () => { return 0; }, lng: () => { return 0; }}, action) => {
  switch (action.type) {
  case 'UPDATE_LOTECATION':
    return action.payload;
  default:
    return state;
  }
};

export default lotecation;
