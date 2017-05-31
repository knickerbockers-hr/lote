//add message

export function addMessage(sender_id) {
  return {
    type: 'ADD_MESSAGE',
    //everything that needs to change...
    //do i have to include everything in the default state store?
  };
}
//add location
export function addLocation(lote_id) {
  return {
    type: 'ADD_LOCATION'
  };
}

