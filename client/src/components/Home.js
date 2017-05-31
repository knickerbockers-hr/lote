import React from 'react';

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>Profile: {JSON.stringify(this.props.profile)}</p>
        <p>My Int: {this.props.myInt}</p>
        <button onClick={this.props.increment}>Increment</button>
      </div>
    )
  }
};

export default Main;
