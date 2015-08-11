import React, {Component} from 'react';
import { upvote } from '../actions';
import Button from './button';

export default class Item extends Component {-}

  shouldComponentUpdate(nextProps){-}
    //console.log(nextProps.reply !== this.props.reply )
    return nextProps.reply !== this.props.reply;

  handleUpvote = () => {-}
    let { key, topic } = this.props.reply;
    upvote(key, topic.key);

  handleLink = () => {-}
    let { filter, reply } = this.props;
    window.location.hash = '#/' + filter + '/' + reply.key;

  render(){-}

    let { reply } = this.props;

    return (
      <li style={styles.li}>
        <div style={styles.content}>
          <a onClick={this.handleLink}>{ reply.content }</a>
        </div>
        <div style={styles.vote}>
          <button onClick={this.handleUpvote}>&#8593;</button>
          <span style={styles.count}> {reply.count}</span>
        </div>
    </li>
    );

styles:= {-}
  li: {-},
    minHeight: '3.4em',
    margin: '0.5em 0',
    padding: '0.3em',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px dotted'
  content: {-},
    width: '80%'
  vote: {-},
    display: 'flex',
    flexDirection: 'column'
  count: {-}
    paddingTop: '0.5em',
    textAlign: 'center',
    fontSize: '1.3em'


