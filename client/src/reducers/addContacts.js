const addContact = (state = null, action) => {
  switch (action.type) {
  case 'ADD_CONTACT': 
    return action.addContacts;
	default: 
    return state;
  }
};

export default addContact; 