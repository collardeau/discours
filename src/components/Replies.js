import React, { Component, PropTypes } from 'react';
import ReplyItem from './ReplyItem';

export default class Replies extends React.Component {

  render(){

    const {hasReplies, order, parentId, replies, topicId, upvote } = this.props;

    let styles = {
      info: {
        margin: '0.5em'
      }
    };

    if(hasReplies === -1){
      return <div style={styles.info}>Loading...</div>;
    }else if (hasReplies === 0) {
      return <div style={styles.info}>No replies, be the first to respond!</div>;
    }

    return (
      <ul key='list'>
        { replies.map((reply, i) =>
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

Replies.propTypes = {
  order: PropTypes.oneOf(['new', 'popular']).isRequired,
  replies: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    topicId: PropTypes.string.isRequired
  })).isRequired
};



