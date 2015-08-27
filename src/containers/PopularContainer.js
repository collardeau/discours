import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import Replies from '../components/Replies';
import { fetchPopularIfNeeded, upvote } from '../actions/actions';

function loadData(props) {
  const { fetchPopularIfNeeded, topicId } = props;
    fetchPopularIfNeeded(topicId); // could bind this topic id 
  }

class PopularContainer extends Component {

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

    const { hasReplies, permissions, 
      topicId, replies, upvote } = this.props;

    return (
        <Replies
          hasReplies = {hasReplies}
          order = 'popular' 
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
    fetchPopularIfNeeded: (topicId) => dispatchProps.fetchPopularIfNeeded(topicId),
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
  {fetchPopularIfNeeded, upvote},
  mergeProps
)(PopularContainer);

