import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import Topic from '../components/Topic';
import Warning from '../components/Warning';
import Replies from '../components/Replies';
import ReplyForm from '../components/ReplyForm';
import Filter from '../components/Filter';
import {addReply, clearWarning, toggleForm, 
  unqueueIfNeeded, upvote} from '../actions/actions';

class TopicContainer extends Component {

  render(){

    //console.log('topic container props: ', this.props);

    const { addReply, clearWarning, formIsOpen, hasReplies, order, permissions, 
      parentTopic, queuedReplies, toggleForm, 
      topic, topicId, replies, unqueueIfNeeded, upvote, warning } = this.props;

    return (
      <div>
        <Warning 
          clearWarning={clearWarning} 
          warning={warning} />
        <Topic
          formIsOpen = {formIsOpen}
          order = {order}
          parentTopic = {parentTopic}
          toggleForm = {toggleForm}
          topic = {topic}
          topicId={topicId}
        />
       <ReplyForm
          addReply={addReply}
          formIsOpen = {formIsOpen}
          permissions = {permissions}
          topic={topic}
          topicId={topicId}
        />
        <Filter
          order={order}
          queued = {queuedReplies}
          topicId= {topicId}
          unqueueIfNeeded = { unqueueIfNeeded }
        />
        <Replies
          hasReplies = {hasReplies}
          order = {order}
          permissions = {permissions}
          parentId={topicId}
          replies = {replies}
          topicId = {topicId}
          upvote = {upvote}
        />
      </div>
    );
  }
}

function mapStateToProps(state){
  const { formIsOpen, haveReplies, permissions, 
    repliesByNew, repliesByPopular, route, 
    selectedTopic, topics, votes, warning } = state;
  const order = route;
  const topicId = selectedTopic;
  const replies = order === 'popular' ? repliesByPopular : repliesByNew;

  return {
    formIsOpen,
    haveReplies,
    order,
    permissions,
    topicId,
    topics,
    replies,
    repliesByNew,
    votes,
    warning
  };

}

function mergeProps(stateProps, dispatchProps, parentProps) {
  const { formIsOpen, haveReplies, order, permissions, 
    replies, repliesByNew, topics, topicId, warning } = stateProps;
  const parentId = topics[topicId].parentId;

  return Object.assign({}, parentProps, {
    addReply: (inResponseTo, reply) => dispatchProps.addReply(inResponseTo, reply),
    clearWarning: () => dispatchProps.clearWarning(),
    formIsOpen: stateProps.formIsOpen,
    hasReplies: haveReplies[topicId],
    queuedReplies: repliesByNew[topicId].queued.length,
    order,
    permissions,
    parentTopic: topics[parentId] || {content: '', topicId: ''},
    replies: replies[topicId].view.map(tId => {
      return {...topics[tId], count: stateProps.votes[tId], topicId: tId };
    }),
    toggleForm: () => dispatchProps.toggleForm(),
    topic: topics[topicId],
    topicId,
    unqueueIfNeeded: (topicId) => dispatchProps.unqueueIfNeeded(topicId),
    upvote: (topicId, parentId) => dispatchProps.upvote(topicId, parentId),
    warning
  });
}

export default connect(
  mapStateToProps,
  {addReply, clearWarning, toggleForm, unqueueIfNeeded, upvote},
  mergeProps
)(TopicContainer);

