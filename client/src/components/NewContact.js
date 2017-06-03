import React from 'react';
import axios from 'axios';
import styles from '../css/styles';

class NewContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.onUpdateInput = this.onUpdateInput.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onUpdateInput(input) {
    this.setState({
      input: input.target.value
    }); 
  }

  handleSubmit() {
    this.props.addContact(this.state.input); 

    e.preventDefault();

    axios.post(`/api/profiles/${this.props.profile.id}/contacts`, {
      senderId: this.props.profile.id,
      receiverId: this.props.profile.id,
      contactType: 'contacts_text',
      contact: this.refs.message.value
    })
    .then((res) => {
      console.log (res);
    })
    .catch((err) => {
      console.log (err);
    });

    this.refs.contactForm.reset();
  }

  render() {
    return (
      <div>
        <h4>New Contact</h4>
          <input
            className="form-control"
            placeholder="Type a Name!"
            value={ this.state.input }
            onChange={ this.onUpdateInput }
          />
          <button 
            type="button" 
            id="buttonSearch"
            style={ styles.searchButton }
            value={ this.state.input }
            onClick={ this.handleSubmit }
            className="btn btn-primary btn-md">Enter Contact
          </button>
      </div>
    );
  }
}

export default NewContact;
