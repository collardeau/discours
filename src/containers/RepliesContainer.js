import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import Replies from '../components/Replies';
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

    return (
        <Replies
          canVote = {canVote}
          hasReplies = {hasReplies}
          order = 'new' 
          parentId={topicId}
          replies = {replies}
          topicId = {topicId}
          upvote = {upvote}
        />
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

