import React from 'react';

class Lote extends React.Component {
  render() {
    return (
      <div>
        <h1>Lote</h1>
        <p>{JSON.stringify(this.props.match.params.loteId)}</p>
      </div>
    )
  }
};

export default Lote;
