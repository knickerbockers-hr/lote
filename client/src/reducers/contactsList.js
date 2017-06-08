const contacts = (state = [], action) => {
  switch (action.type) {
  case 'CONTACTS_LIST': 
    return {
      ...state,
      contacts: [...state, action.contacts]
    };
  default:
    return state;
  }
};

export default contacts;