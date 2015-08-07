import React, { Component } from 'react';
import ReplyForm from './ReplyForm';

export default class Topic extends Component {-}

  render(){-}

    topic:= this.props.topic;
    parentTopic:= '';
    if(topic.topic) {-}
      parentTopic = "in response to: " + topic.topic.content;

    return (
      <div> 
        <h2>{topic.content} - X count</h2>
        <span>{ parentTopic }</span>
      </div> 
    );

