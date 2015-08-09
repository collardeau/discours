import React, {Component} from 'react';
import { upvote } from '../actions';

export default class Item extends Component {-}

  shouldComponentUpdate(nextProps){-}
    //console.log(nextProps.reply !== this.props.reply )
    return nextProps.reply !== this.props.reply;

  handleUpvote = () => {-}
    console.log('upvote');
    let { key, topic } = this.props.reply;
    upvote(key, topic.key);

  handleLink = () => {-}
    let { route, reply } = this.props;
    window.location.hash = '#/' + route + '/' + reply.key;

  render(){-}

    let { reply } = this.props;

    styles:= {-}
      li: {-}
        height: 50,

    upvote:=  <button onClick={this.handleUpvote}>Up</button>
    
    return (
      <li style={styles.li}>
        <a onClick={this.handleLink}>{ reply.content }</a>
        <b>{reply.count}</b> votes
        { upvote }
      </li>
    );

