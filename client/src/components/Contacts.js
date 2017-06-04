import React from 'react'; 
import List from './List';
import NewContact from './NewContact';

class Contacts extends React.Component {
  render() {
    return (
      <div>
        <h1>Contacts</h1>
        <NewContact {...this.props} />
        <List {...this.props} />
      </div>
    );
  }
}

export default Contacts;
