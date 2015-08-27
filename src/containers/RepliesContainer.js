import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import Topic from '../components/Topic';
import Warning from '../components/Warning';
import Replies from '../components/Replies';
import ReplyForm from '../components/ReplyForm';
import Filter from '../components/Filter';
import {addReply, clearWarning, fetchTopicIfNeeded, toggleForm, 
  unqueueIfNeeded, unsync, upvote} from '../actions/actions';

function loadData(props) {
    const { fetchTopicIfNeeded, topicId } = props;
    fetchTopicIfNeeded(topicId); // if(!isSameTopic){ unsync(previousTopicId); }
  }


class TopicContainer extends Component { //DiscourContainer

  componentDidMount(){
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.topicId !== this.props.topicId){
      loadData(nextProps);
     }
 }

  render(){

    const { addReply, clearWarning, formIsOpen, hasReplies, order, permissions, 
      parentTopic, queuedReplies, toggleForm, 
      topic, topicId, replies, unqueueIfNeeded, upvote, warning } = this.props;

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
  const { formIsOpen, haveReplies, permissions, 
    repliesByNew, repliesByPopular, 
    topics, votes, warning } = state;

  return {
    formIsOpen,
    haveReplies,
    permissions,
    topics,
    repliesByNew,
    repliesByPopular,
    votes,
    warning
  };

}

function mergeProps(stateProps, dispatchProps, parentProps) {
  const { formIsOpen, haveReplies, permissions, 
    repliesByNew, repliesByPopular, topics, warning } = stateProps;

  const topicId = parentProps.params.topicId || 'root';
  const order = parentProps.params.order || 'new'; 
  const parentId = topics[topicId] ? topics[topicId].parentId : 'none';
  const parentTopic = topics[parentId] ? topics[parentId] : {content: '', topicId: ''};
  const topic = topics[topicId] ? topics[topicId] : { content: '', parentId: ''};
  const selectedReplies = order === 'popular' ? repliesByPopular : repliesByNew;
  const replies = selectedReplies[topicId] ? 
    selectedReplies[topicId].view.map(tId => {
      return {...topics[tId], count: stateProps.votes[tId], topicId: tId };
    }) : [];
  const queuedReplies = repliesByNew[topicId] ? 
    repliesByNew[topicId].queued.length : 0;

  return Object.assign({}, parentProps, {

    // actions
    addReply: (inResponseTo, reply) => dispatchProps.addReply(inResponseTo, reply),
    clearWarning: () => dispatchProps.clearWarning(), // should be app wide
    fetchTopicIfNeeded: (topicId, order) => dispatchProps.fetchTopicIfNeeded(topicId, order),
    toggleForm: () => dispatchProps.toggleForm(),
    unqueueIfNeeded: (topicId) => dispatchProps.unqueueIfNeeded(topicId),
    unsync: (topicId) => dispatchProps.unsync(topicId),
    upvote: (topicId, parentId) => dispatchProps.upvote(topicId, parentId),
 
    //props
    formIsOpen: stateProps.formIsOpen,
    hasReplies: haveReplies[topicId],
    queuedReplies,
    order,
    permissions,
    parentTopic,
    replies,
    topic,
    topicId,
    warning
  });
}

export default connect(
  mapStateToProps,
  {addReply, clearWarning, fetchTopicIfNeeded,
    toggleForm, unqueueIfNeeded, upvote, unsync
  },
  mergeProps
)(TopicContainer);

