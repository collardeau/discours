import React, {Component, PropTypes} from 'react';
import { canVote, upvote } from '../actions/actions';
import {connect } from 'react-redux';
import Vote from '../components/Vote';

class VoteContainer extends Component {

  componentDidMount(){
  }

  componentWillUnmount(){
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
    upvote: () => dispatchProps.upvote(topicId, parentId)
  });
}

export default connect(
  mapStateToProps, { canVote, upvote }, mergeProps
)(VoteContainer);

// syncChange
