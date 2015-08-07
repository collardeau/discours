import React, { Component } from 'react';
import Replies from './Replies';
import ReplyForm from './ReplyForm';
import Topic from './Topic';

export default class ReplyContainer extends Component {-}

  render(){-}

    topic:= this.props.topic;

    return (
      <div> 
        <Topic topic={topic}/>
        <ReplyForm topic={topic}/>
        <Replies replies={this.props.replies} topicKey={topic.key}/>
        <div>Vote credit</div>
      </div> 
    );

