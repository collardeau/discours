import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import Replies from '../components/Replies';
import { upvote } from '../actions/actions';

function loadData(props) {
  //const { fetchTopicIfNeeded, topicId } = props;
  }


class RepliesContainer extends Component { //DiscourContainer

  componentDidMount(){
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps){
    // check the order of things
    if(nextProps.topicId !== this.props.topicId){
      loadData(nextProps);
     }
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
  const { haveReplies, repliesByNew, repliesByPopular, 
    topics, votes, warning } = state;

  return {
    haveReplies,
    topics,
    repliesByNew,
    repliesByPopular,
    votes,
    warning
  };

}

function mergeProps(stateProps, dispatchProps, parentProps) {
  const { haveReplies, repliesByNew, repliesByPopular, topics } = stateProps;
  const { topicId, order, permissions } = parentProps;

  const selectedReplies = order === 'popular' ? repliesByPopular : repliesByNew;
  const replies = selectedReplies[topicId] ? 
    selectedReplies[topicId].view.map(tId => {
      return {...topics[tId], count: stateProps.votes[tId], topicId: tId };
    }) : [];

  return Object.assign({}, parentProps, {

    // actions
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
  {upvote},
  mergeProps
)(RepliesContainer);

