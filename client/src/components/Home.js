import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageStyle: {
        width: '100%',
        position: 'fixed',
        left: '0',
        top: '0',
        zIndex: '-1',
      },
      headerStyle: {
        textAlign: 'center',
        color: 'white',
        marginTop: '500px',
      },
    };
  }

  componentWillMount() {
    this.props.setActivePage('Lote');
  }

  render() {
    return (
      <div style={ this.state.style }>
        <img style={ this.state.imageStyle } src='/assets/splash_1.jpg'/>
        <h1 style={ this.state.headerStyle }>Lote: for location-based notes!</h1>
      </div>
    );
  }
}

export default Home;
