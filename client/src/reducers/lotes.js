const lotes = (state = [], action) => {
  switch (action.type) {
  case 'ADD_LOTES' :
    console.log('adding lotes to store');
    return action.lotes;
  default:
    return state;
  }
};

export default lotes;
