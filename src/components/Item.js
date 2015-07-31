import React from 'react';
import actions from '../actions';

export default class Item extends React.Component {-}

  handleVoteClick = () => {-}
    let {key, parentKey } = this.props.item; 
    actions.upVote(key, parentKey);

  handleClick = () => {-}
    boom.syncReply(this.props.item.key);

  shouldComponentUpdate(nextProps){-}
    console.log('should item update', this.props.item.content);
    return this.props.item === nextProps.item;

  componentWillUpdate(){-}
    console.log('component will update');

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

