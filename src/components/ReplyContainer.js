import React from 'react';
import Replies from './Replies';
import ReplyForm from './ReplyForm';

export default class ReplyContainer extends React.Component {-}

  shouldComponentUpdate(){-}
    if(!boom.lastLog.reply) {-}
      //console.log('not updating reply');
      //return false;
    return true;

  render(){-}

    reply:= this.props.reply;

    return (
      <div> 
        <h2>{reply.content} - X count</h2>
        <span>In response to: 'something'</span>
        <ReplyForm />
        <Replies replies={this.props.replies} parentKey={reply.key}/>
        <div>Vote credit</div>
      </div> 
    );

