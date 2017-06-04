
//defines selected reducer's response to actions
const activeContact = (state = null, action) => {
  switch (action.type) {
  case 'SET_ACTIVE_CONTACT': 
    return action.activeContact; 
  default:
    return state;
  }
};

export default activeContact; 
