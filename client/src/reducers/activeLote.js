const activeLote = (state = {}, action) => {
  switch (action.type) {
  case 'SET_ACTIVE_LOTE': 
    return action.activeLote;
  default:
    return state;
  }
};

export default activeLote;
