import React, { Component, PropTypes } from 'react';
import ReplyItem from './ReplyItem';

export default class Replies extends React.Component {

  render(){
    const {order, parentId, replies, upvote } = this.props;
    return (
      <ul>
        { replies.map((reply) =>
          <ReplyItem
            key={reply.topicId}
            order={order}
            parentId={parentId}
            reply={reply}
            upvote={upvote}
          />
        )}
      </ul>
    );

  }
}

//<li key={i}>{ reply.content } : { reply.count}</li>
Replies.propTypes = {
  order: PropTypes.oneOf(['new', 'popular']).isRequired,
  replies: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    topicId: PropTypes.string.isRequired
  })).isRequired
};



