import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import ReplyItem from '../components/ReplyItem';
import { fetchReplies, upvote } from '../actions/actions';

function loadData(props) {
  const { fetchReplies, topicId } = props;
    fetchReplies(topicId);
}

class RepliesContainer extends Component {

  componentDidMount(){
    loadData(this.props);
  }

  shouldComponentUpdate(nextProps){
    return true;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.topicId !== this.props.topicId){
      loadData(nextProps);
    }
  }

  render(){

    const { canVote, hasReplies, 
      topicId, replies, upvote } = this.props;

    if(hasReplies === -1){
      return <div style={{margin: '0.5em'}}>Loading...</div>;
    }else if (hasReplies === 0) {
      return <div style={{margin: '0.5em'}}>No replies, be the first to respond!</div>;
    }

    return (
      <ul> 
        { replies.map((reply, i) =>
          <ReplyItem
            canVote={canVote}
            key={i}
            order='new'
            parentId={topicId}
            reply={reply}
            upvote={upvote}
          />
        )}
      </ul>
    );
  }
}

function mapStateToProps(state){
  const { haveReplies, repliesByNew, permissions,
    topics, votes } = state;

  return {
    haveReplies,
    topics,
    repliesByNew,
    permissions,
    votes
  };

}

function mergeProps(stateProps, dispatchProps, parentProps) {
  const { haveReplies, repliesByNew, permissions, topics } = stateProps;
  const topicId = parentProps.params.topicId || 'root';
  const replies = repliesByNew[topicId] ? 
    repliesByNew[topicId].view.map(tId => {
      return {...topics[tId], count: stateProps.votes[tId], topicId: tId };
    }) : [];

  return Object.assign({}, parentProps, {

    // actions
    fetchReplies: topicId => dispatchProps.fetchReplies(topicId),
    upvote: (topicId, parentId) => dispatchProps.upvote(topicId, parentId),
 
    //props
    hasReplies: haveReplies[topicId],
    canVote: permissions.vote,
    replies,
    topicId
  });
}

export default connect(
  mapStateToProps,
  {fetchReplies, upvote},
  mergeProps
)(RepliesContainer);

