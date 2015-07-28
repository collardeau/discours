import React from 'react';
import actions from '../actions';

export default class Item extends React.Component {-}

  handleVoteClick = () => {-}
    let {key, parentKey } = this.props.item; 
    actions.upVote(key, parentKey);

  handleGoClick = () => {-}
    console.log('go to convo: ' + this.props.item.key);

  render(){-}

    let { item } = this.props;

    return (
    
      <li>
        <span onClick={this.handleGoClick}>
          { item.content }
        </span>
        - <b>{item.count}</b> votes
        <button onClick={this.handleVoteClick}>Up</button>
      </li>
    
    );

