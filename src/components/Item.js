import React from 'react';

export default class Item extends React.Component {

  render(){

    let { key } = this.props;

    return (
      <li key={key}>{this.props.children}</li>
    );
  }
}

