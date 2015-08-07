import React from 'react';
import ReplyItem from './ReplyItem';

export default class Replies extends React.Component {-}

  render(){-}
    replies:= () => {-}
      res:= [];
      for (var reply of this.props.replies.values()) {-}
        res.push(<ReplyItem reply={reply} key={reply.key} />);
      return res;

    return (
      <div>
        <ul>{replies()}</ul>
      </div>
    );


