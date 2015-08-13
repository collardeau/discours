import React, {Component, findDOMNode} from 'react';
import { upvote } from '../actions/appActions';

export default class Item extends Component {-}

  shouldComponentUpdate(nextProps){-}
    //console.log(nextProps.reply !== this.props.reply )
    return nextProps.reply !== this.props.reply;

  handleUpvote = (e) => {-}
    e.stopPropagation();
    let { key, topic } = this.props.reply;
    upvote(key, topic.key);
    findDomNode(this.refs.btn)

  handleLink = () => {-}
    let { filter, reply } = this.props;
    window.location.hash = '#/' + filter + '/' + reply.key;

  render(){-}

    let { reply } = this.props;

    return (
      <li onClick={this.handleLink} style={styles.li}>
        <div style={styles.content}>{ reply.content }</div>
        <div style={styles.vote}>
          <button ref='btn' onClick={this.handleUpvote}>&#8593;</button>
          <span style={styles.count}> {reply.count}</span>
        </div>
    </li>
    );

styles:= {-}
  li: {-},
    minHeight: '3.4em',
    margin: '0.5em 0',
    padding: '0 0.5em',
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


