import React from 'react';
import actions from '../actions';

export default class Item extends React.Component {-}

  handleVoteClick = () => {-}
    let {key, ancestor} = this.props.item; 
    actions.upVote(key, ancestor);

  render(){-}

    let { key, item } = this.props;

    return (
    
      <li key={key}>
        { item.content } - <b>{item.count}</b> votes
        <button onClick={this.handleVoteClick}>Up</button>
      </li>
    
    );

