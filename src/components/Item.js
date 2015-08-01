import React from 'react';
import actions from '../actions';

export default class Item extends React.Component {-}

  handleVoteClick = () => {-}
    let {key, parentKey } = this.props.item; 
    boom.upvote(key, parentKey);

  handleClick = () => {-}
    boom.syncReply(this.props.item.key);

  shouldComponentUpdate(nextProps){-}
    console.log(!nextProps.item === this.props.item, this.props.item);
    return !nextProps.item === this.props.item; 

  render(){-}

    let { item } = this.props;

    return (
      <li>
        <a href={'#' + item.key}>{ item.content }</a>
        - <b>{item.count}</b> votes
        <span onClick={this.handleClick}>Go to</span>
        <button onClick={this.handleVoteClick}>Up</button>
      </li>
    
    );

