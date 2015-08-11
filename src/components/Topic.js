import React, { Component } from 'react';
import ReplyForm from './ReplyForm';

export default class Topic extends Component {-}

  handleClick = (e) => {-}
    e.preventDefault();
    window.location.hash = '' + 
      this.props.replyFilter + '/' + 
      this.props.topic.get('topic').key;

  render(){-}

    topic:= this.props.topic;
    hasParentTopic:= topic.get('topic');
    var parentTopic;
    var count;

    if(hasParentTopic && hasParentTopic.content !== 'none') {-}
      count = topic.get('count');
      parentTopic = (
        <small style={styles.parentTopic}>
          In response to:
          <a href='#' onClick={this.handleClick}> {hasParentTopic.content}</a>
        </small>
      );

    return (
      <div style={styles.topic}> 
        <span>{ parentTopic }</span>
        <h3>{topic.get('content')}</h3>
      </div> 
    );

styles:= {-}
  topic: {-},
    backgroundColor: '#ddd',
    padding: '0.5em 0.3em',
  parentTopic: {-},
    paddingLeft: '0.8em'


