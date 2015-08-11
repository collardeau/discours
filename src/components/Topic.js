import React, { Component } from 'react';
import ReplyForm from './ReplyForm';

export default class Topic extends Component {-}

  handleClick = (e) => {-}
    e.preventDefault();
    window.location.hash = '' + 
      this.props.filter + '/' + 
      this.props.topic.get('topic').key;

  render(){-}

    topic:= this.props.topic;
    hasParentTopic:= topic.get('topic');
    var parentTopic;
    var count;

    if(hasParentTopic && hasParentTopic.content !== 'none') {-}
      count = topic.get('count');
      parentTopic = (
        <div style={styles.parentTopic}>
          <small> 
            In response to: <a href='#' onClick={this.handleClick}> 
              {hasParentTopic.content}
            </a>
          </small>
        </div>
      );

    return (
      <div style={styles.topic}> 
        <span>{ parentTopic }</span>
        <div style={styles.flex}>
          <p style={styles.content}>{topic.get('content')}</p>
          <span style={styles.child}>
            <button> Reply</button>
          </span>
        </div>
      </div> 
    );

styles:= {-}
  topic: {-},
    backgroundColor: '#ddd',
    padding: '0.5em 0.5em',
  parentTopic: {-},
    marginBottom: '0.8em'
  flex: {-},
    display: 'flex',
    justifyContent: 'space-between',
  content: {-},
    margin: 0,
    fontSize: '1.3em'

