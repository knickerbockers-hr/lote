import React from 'react';
import { Link } from 'react-router-dom';
import Sub from './Sub';

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>Random</h1>
        <Link to="/"><p>React Router Link to Homepage</p></Link>
        <Link to="/lotes"><p>React Router Link to Lotes</p></Link>
        <Link to="/lotes/1"><p>React Router Link to Lote 1</p></Link>
        <a href="/login"><p>Hyperlink to Login</p></a>
        <input type="button" value="Input Button" />
        <p>P Tag Text</p>
        <Sub {...this.props} />
        {JSON.stringify(this.props)}
      </div>
    );
  }
}

export default Main;
