const userLocation = (state = {lat: () => { return 0; }, lng: () => { return 0; }}, action) => {
  switch (action.type) {
  case 'UPDATE_USER_LOCATION':
    return action.payload;
  default:
    return state;
  }
};

export default userLocation;