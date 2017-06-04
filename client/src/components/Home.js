import React from 'react';

class Home extends React.Component {
  componentWillMount() {
    this.props.setActivePage('Lote');
  }

  render() {
    return (
      <h1></h1>
    );
  }
}

export default Home;
