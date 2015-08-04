import React from 'react';
import Replies from './Replies';
import ReplyForm from './ReplyForm';

export default class ReplyContainer extends React.Component {-}

  shouldComponentUpdate(){-}
    if(!boom.lastLog.topic) {-}
      //console.log('not updating reply');
      //return false;
    return true;

  render(){-}

    topic:= this.props.topic;

    return (
      <div> 
        <h2>{topic.content} - X count</h2>
        <span>In response to: 'something'</span>
        <ReplyForm />
        <Replies replies={this.props.replies} parentKey={topic.key}/>
        <div>Vote credit</div>
      </div> 
    );

