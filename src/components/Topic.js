import React, { Component } from 'react';
import ReplyForm from './ReplyForm';

export default class Topic extends Component {-}

  render(){-}

    topic:= this.props.topic;
    parentTopic:= topic.get('topic');
    var parentTopicTxt;
    var count;

    if(parentTopic && parentTopic.content !== 'none') {-}
      parentTopicTxt = "in response to: " + parentTopic.content;
      count = Math.abs(topic.get('count'));

    return (
      <div> 
        <h2>{topic.get('content')}</h2>
        <p>{ count }</p>
        <span>{ parentTopicTxt }</span>
      </div> 
    );

