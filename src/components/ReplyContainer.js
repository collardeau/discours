import React from 'react';
import ReplyContent from './ReplyContent';
import ReplyForm from './ReplyForm';

export default class ReplyContainer extends React.Component {-}

  shouldComponentUpdate(){-}
    if(!boom.lastLog.reply) {-}
      console.log('not updating reply');
      return false;
    return true;

  render(){-}

    return (
      <div> 
        <ReplyForm />
        <ReplyContent reply={this.props.reply}/>
      </div> 
    );

