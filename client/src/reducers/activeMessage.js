const activeMessage = (state = null, action) => {
  switch (action.type) {
  case 'SET_ACTIVE_MESSAGE': 
    return action.activeMessage;
  default:
    return state;
  }
};

export default activeMessage; 
