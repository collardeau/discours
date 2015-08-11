import React, { Component } from 'react';
import Replies from './Replies';
import ReplyForm from './ReplyForm';
import Filter from './Filter';
import Topic from './Topic';

export default class ReplyContainer extends Component {-}

  render(){-}

    topic:= this.props.topic;
    topicKey:= topic.get('key');

    //<ReplyForm topic={topic}/>
    return (
      <div> 
        <Topic topic={topic} replyFilter={this.props.replyFilter}/>
        <Filter topicKey={topicKey} replyFilter={this.props.replyFilter}/>
        <Replies 
          replies={this.props.replies} 
          topicKey={topicKey}
          replyFilter={this.props.replyFilter}
        />
      </div> 
    );

