
//defines selected reducer's response to actions
const activeContact = (state = null, action) => {
  switch (action.type) {
  case 'CONTACT_SELECTED': 
    return action.activeContact; 
  default:
    return state;
  }
};

export default activeContact; 
