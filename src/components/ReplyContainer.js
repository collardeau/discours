import React from 'react';
import Replies from './Replies';
import ReplyForm from './ReplyForm';

export default class ReplyContainer extends React.Component {-}

  shouldComponentUpdate(){-}
    if(!boom.lastLog.reply) {-}
      console.log('not updating reply');
      return false;
    return true;

  render(){-}

    reply:= this.props.reply;

    return (
      <div> 
        <h2>{reply.content} - { reply.count}</h2>
        <span>In response to: hello</span>
        <ReplyForm />
        <Replies reply={reply}/>
        <div>Vote credit</div>
      </div> 
    );

