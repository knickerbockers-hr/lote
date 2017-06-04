import React from 'react';
import { Redirect } from 'react-router';

class List extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      contactCardStyle: {
        backgroundColor: '#eaeaea',
        borderRadius: 5,
        marginTop: 5,
        padding: 5,
      }
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(receiver) {
    this.props.setActiveContact(receiver);
    this.props.history.push('/lotes');
  }

  render() {
    return (
      <div>
        { !this.props.contacts ? <p>No Contacts Yet!</p>
          : this.props.contacts.map((contact, index) => {
            return (
              <div style={ this.state.contactCardStyle } key={ index } onClick={ () => this.handleClick(contact.receiver) }>
                { contact.receiver.display ? contact.receiver.display : contact.receiver.email }
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default List;
