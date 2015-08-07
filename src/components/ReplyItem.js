import React, {Component} from 'react';
import { upvote } from '../actions';

export default class Item extends Component {-}

  handleButtonClick = () => {-}
    let { key, topicKey } = this.props.reply;
    upvote(key, topicKey);

  render(){-}

    let { reply } = this.props;

    styles:= {-}
      li: {-}
        height: 50,

    return (
      <li style={styles.li}>
        <a href={'#new/' + reply.key}>{ reply.content }</a>
        - <b>{Math.abs(reply.count)}</b> votes
        <button onClick={this.handleButtonClick}>Up</button>
      </li>
    );

