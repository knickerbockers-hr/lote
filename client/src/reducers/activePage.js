const activePage = (state = null, action) => {
  switch (action.type) {
  case 'SET_ACTIVE_PAGE': 
    return action.activePage;
  default:
    return state;
  }
};

export default activePage; 
