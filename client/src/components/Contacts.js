import React from 'react'; 
import List from './List';
import NewContact from './NewContact';

class Contacts extends React.Component {

  componentWillMount() {
    this.props.setActivePage('Contacts');
  }

  render() {
    return (
      <div className="pageContainer">
        <NewContact {...this.props} />
        <List {...this.props} />
      </div>
    );
  }
}

export default Contacts;
