import React from 'react';
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux'; 
import { search, selectContact } from '../actions'; 
import List from '../containers/list';
//import Search from './search';
import NewContact from './NewContact';
import ContactDetail from '../containers/contact-details';
import styles from '../css/styles';

class Contacts extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      contacts: []
    };
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.search = this.search.bind(this); 
  }

  onUpdateInput(e) {
    this.setState({
      input: e.target.value
    });
  }

  search() {
    //add to dom
    //call on search method from higher level 
    console.log('INPUT', this.state.input);
  }

  render() {
    return (
      <div>
        <h1>Contacts</h1>
        <NewContact
          input={ this.state.input }
        />
        <List
          search={ this.search }
        />
        <ContactDetail
          //input={ this.state.input }
          search={ this.search }
        />
      </div>
    );
  }
}

export default Contacts;
