import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import ReplyItem from '../components/ReplyItem';
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

    const { canVote, topicId, replies, upvote } = this.props;

    return (
      <ul> 
        { replies.map((reply, i) =>
          <ReplyItem
            canVote={canVote}
            key={i}
            order='popular'
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
  const { repliesByPopular, topics, votes } = state;

  return {
    repliesByPopular,
    topics,
    votes
  };

}

function mergeProps(stateProps, dispatchProps, parentProps) {
  const { repliesByPopular, topics } = stateProps;
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
    replies,
    topicId
  });
}

export default connect(
  mapStateToProps,
  {fetchPopularIfNeeded, upvote},
  mergeProps
)(PopularContainer);

