import React, {Component} from 'react';
import { upvote } from '../actions';

export default class Item extends Component {-}

  shouldComponentUpdate(nextProps){-}
    //console.log(nextProps.reply !== this.props.reply )
    return nextProps.reply !== this.props.reply;

  handleUpvote = () => {-}
    let { key, topic } = this.props.reply;
    upvote(key, topic.key);

  handleLink = () => {-}
    let { replyFilter, reply } = this.props;
    window.location.hash = '#/' + replyFilter + '/' + reply.key;

  render(){-}

    let { reply } = this.props;

    styles:= {-}
      li: {-}
        height: 50,

    upvote:=  <button onClick={this.handleUpvote}>Up</button>
    
    return (
      <li style={styles.li}>
        <a onClick={this.handleLink}>{ reply.content }</a>
        <b> {reply.count}</b> votes
        { upvote }
      </li>
    );

