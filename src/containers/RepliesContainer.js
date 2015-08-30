import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReplyItem from '../components/ReplyItem';

class RepliesContainer extends Component {

  shouldComponentUpdate(nextProps){
    return true;
  }

  render(){

    const { hasReplies, topicId, replies } = this.props;

    if(hasReplies === -1){
      return <div style={{margin: '0.5em'}}>Loading...</div>;
    }

    if (hasReplies === 0) {
      return <div style={{margin: '0.5em'}}>No replies, be the first to respond!</div>;
    }

    return (
      <ul> 
        { replies.map((reply, i) =>
          <ReplyItem
            key={reply.topicId}
            order='new'
            parentId={topicId}
            reply={reply}
          />
        )}
      </ul>
    );
  }
}

function mapStateToProps(state){
  const { haveReplies, repliesByNew, topics } = state;

  return {
    haveReplies,
    topics,
    repliesByNew
  };

}

function mergeProps(stateProps, dispatchProps, parentProps) {
  const { haveReplies, repliesByNew, topics } = stateProps;
  const topicId = parentProps.params.topicId || 'root';
  const replies = repliesByNew[topicId] ? 
    repliesByNew[topicId].view.map(tId => {
      return {topicId: tId, ...topics[tId]};
    }) : [];

  return Object.assign({}, parentProps, {
    hasReplies: haveReplies[topicId],
    replies,
    topicId
  });
}

export default connect(
  mapStateToProps,
  {},
  mergeProps
)(RepliesContainer);

