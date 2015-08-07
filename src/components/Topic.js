import React, { Component } from 'react';
import ReplyForm from './ReplyForm';

export default class Topic extends Component {-}

  render(){-}

    topic:= this.props.topic;
    console.log(topic);
    parentTopic:= '';
    if(topic.topic) {-}
      parentTopic = "in response to: " + topic.topic.content;

    return (
      <div> 
        <h2>{topic.content} - {Math.abs(topic.count)}</h2>
        <span>{ parentTopic }</span>
      </div> 
    );

