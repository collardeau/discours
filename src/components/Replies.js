import React, { Component, PropTypes } from 'react';
import ReplyItem from './ReplyItem';

export default class Replies extends React.Component {

  render(){
    console.log(this.props);
    const {replies } = this.props;
    return (
      <ul>
        { replies.map((reply) =>
          <ReplyItem key={reply.topicId} reply={reply} />
        )}
      </ul>
    );

  }
}

//<li key={i}>{ reply.content } : { reply.count}</li>
Replies.propTypes = {
  //dispatch: PropTypes.func.isRequired,
  replies: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    topicId: PropTypes.string.isRequired
  })).isRequired
};



