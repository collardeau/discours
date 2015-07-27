import React from 'react';

export default class Item extends React.Component {-}

  render(){-}

    let { key, item } = this.props;

    return (
    
      <li key={key}>
        { item.content } - <b>{item.count}</b> votes
        <button>Up</button>
      </li>
    
    );

