import React from 'react';
import ReplyItem from './ReplyItem';

export default class Replies extends React.Component {-}

  render(){-}
    replies:= () => {-}
      res:= [];
      for (var reply of this.props.replies.values()) {-}
        res.unshift(
          <ReplyItem 
            key={reply.key}
            reply={reply} 
            replyFilter={this.props.replyFilter}
          />
        );
      return res;

    return (
      <div>
        <ul>{replies()}</ul>
      </div>
    );


