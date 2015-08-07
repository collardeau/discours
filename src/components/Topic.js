import React, { Component } from 'react';
import ReplyForm from './ReplyForm';

export default class Topic extends Component {-}

  render(){-}

    topic:= this.props.topic;

    return (
      <div> 
        <h2>{topic.content} - X count</h2>
        <span>In response to: 'something'</span>
      </div> 
    );

