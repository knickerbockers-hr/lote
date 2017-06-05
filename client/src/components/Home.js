import React from 'react';
//import image from '../css/LocationPin.png'; 

class Home extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
      style: {
        textAlign: 'center'
      }, 
      image: {
        url: 'https://cdn.pixabay.com/photo/2016/11/30/17/10/pin-1873372_960_720.png',
      },
      stretch: {
        width: 200,
        height: 400
      }
    };
  }

  componentWillMount() {
    this.props.setActivePage('Lote');
  }

  render() {
    return (
      <div style={ this.state.style }>
        <h1>Write location-based notes!</h1>
        <img style={ this.state.stretch} src={ this.state.image.url }/>
      </div>
    );
  }
}

export default Home;
