import React from 'react';

class Lotes extends React.Component {
  render() {
    return (
      <div>
        <h1>Lotes</h1>
        {this.props.lotes.map((lote, i) => {
          return (<div key={i}>{lote.id} - {lote.lote.message}</div>);
        })}
      </div>
    );
  }
}

export default Lotes;
