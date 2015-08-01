import React from 'react';
import actions from '../actions';

export default class Item extends React.Component {-}

  handleVoteClick = () => {-}
    boom.upvote(this.props.item.key, this.props.item.parentKey);

  shouldComponentUpdate(nextProps){-}
    return true;

  render(){-}

    let { item } = this.props;

    return (
      <li>
        <a href={'#' + item.key}>{ item.content }</a>
        - <b>{item.count}</b> votes
        <button onClick={this.handleVoteClick}>Up</button>
      </li>
    
    );

