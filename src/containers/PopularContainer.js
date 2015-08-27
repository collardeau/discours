import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import Replies from '../components/Replies';
import { fetchPopularReplies, upvote } from '../actions/actions';

function loadData(props) {
  const { fetchPopularReplies, topicId } = props;
    fetchPopularReplies(topicId);
}

class PopularContainer extends Component {

  componentDidMount(){
    console.log('popular container');
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
  const { haveReplies, repliesByPopular, permissions,
    topics, votes } = state;

  return {
    haveReplies,
    topics,
    repliesByPopular,
    permissions,
    votes
  };

}

function mergeProps(stateProps, dispatchProps, parentProps) {
  const { haveReplies, repliesByPopular, permissions, topics } = stateProps;
  const topicId = parentProps.params.topicId || 'root';
  const replies = repliesByPopular[topicId] ? 
    repliesByPopular[topicId].view.map(tId => {
      return {...topics[tId], count: stateProps.votes[tId], topicId: tId };
    }) : [];

  return Object.assign({}, parentProps, {

    // actions
    fetchPopularReplies: (topicId, order) => dispatchProps.fetchPopularReplies(topicId, order),
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
  {fetchPopularReplies, upvote},
  mergeProps
)(PopularContainer);

