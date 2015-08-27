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
    console.log('replies container');
    loadData(this.props);
  }

  shouldComponentUpdate(nextProps){
    return true;
  }

  componentWillReceiveProps(nextProps){
  }

  render(){

    const { hasReplies, order, permissions, 
      topicId, replies, upvote } = this.props;

    return (
        <Replies
          hasReplies = {hasReplies}
          order = {order}
          permissions = {permissions}
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
    fetchReplies: (topicId, order) => dispatchProps.fetchReplies(topicId, order),
    upvote: (topicId, parentId) => dispatchProps.upvote(topicId, parentId),
 
    //props
    hasReplies: haveReplies[topicId],
    permissions,
    replies,
    topicId
  });
}

export default connect(
  mapStateToProps,
  {fetchReplies, upvote},
  mergeProps
)(RepliesContainer);

