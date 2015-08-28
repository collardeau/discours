import React, {Component, PropTypes} from 'react';
import { canVote, syncVote, unsyncVote, upvote } from '../actions/actions';
import {connect } from 'react-redux';
import Vote from '../components/Vote';

class VoteContainer extends Component {

  componentDidMount(){
    this.props.syncVote();
  }

  componentWillUnmount(){
    console.log('vote container will unmount');
    this.props.unsyncVote();
  }

  render(){
    return <Vote {...this.props }/>;
  }
}


function mapStateToProps(state){
  const { permissions, votes } = state;
  return { permissions, votes };
}

function mergeProps(stateProps, dispatchProps, parentProps) {

  const 
    { permissions, votes } = stateProps,
    { parentId, topicId } = parentProps.reply;

  return Object.assign({}, {
    canVote: permissions.vote,
    voteCount: votes[topicId],
    syncVote: () => dispatchProps.syncVote(topicId, parentId),
    unsyncVote: () => dispatchProps.unsyncVote(topicId, parentId),
    upvote: () => dispatchProps.upvote(topicId, parentId)
  });
}

export default connect(
  mapStateToProps, { syncVote, unsyncVote, upvote }, mergeProps
)(VoteContainer);

