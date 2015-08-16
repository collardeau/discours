import React, { Component, PropTypes } from 'react';

export default class Replies extends React.Component {

  render(){
    //key on topicId?
    return (
      <ul>
        { this.props.replies.map((reply, i) =>
          <li key={i}>{ reply.content } : { reply.count}</li>
        )}
      </ul>
    );

  }
}

Replies.propTypes = {
  dispatch: PropTypes.func.isRequired,
  replies: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired
  })).isRequired
};



