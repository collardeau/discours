import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import Topic from '../components/Topic';
import Replies from '../components/Replies';
import ReplyForm from '../components/ReplyForm';
import Filter from '../components/Filter';
import {addReply, toggleForm, unqueue, upvote} from '../actions/actions';

class TopicContainer extends Component {

  render(){

    console.log('topic container props: ', this.props);

    const { addReply, formIsOpen, hasReplies, order, permissions, 
      parentTopic, queuedReplies, toggleForm, 
      topic, topicId, replies, unqueue, upvote } = this.props;

    return (
      <div>
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
          topic={topic}
          topicId={topicId}
        />
        <Filter
          order={order}
          queued = {queuedReplies}
          topicId= {topicId}
          unqueue = { unqueue }
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

TopicContainer.propTypes = {
  addReply: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['new', 'popular']).isRequired,
  parentTopic: PropTypes.shape({
    content: PropTypes.string.isRequired
  }),
  topic: PropTypes.shape({
    content: PropTypes.string.isRequired
  }),
  topicId: PropTypes.string.isRequired
  //replies: PropTypes.array.isRequired
};

function mapStateToProps(state){
  const { formIsOpen, haveReplies, permissions, repliesByNew, route, 
    selectedTopic, topics, votes } = state;
  const order = route;
  const topicId = selectedTopic;
  //const replies = order === 'popular' ? repliesByCount : repliesByDate;
  const replies = repliesByNew;

  return {
    formIsOpen,
    haveReplies,
    order,
    permissions,
    topicId,
    topics,
    replies,
    votes
  };

}

function mergeProps(stateProps, dispatchProps, parentProps) {
  const { formIsOpen, haveReplies, order, permissions, 
    replies, topics, topicId } = stateProps;
  const parentId = topics[topicId].parentId;

  return Object.assign({}, parentProps, {
    addReply: (inResponseTo, reply) => dispatchProps.addReply(inResponseTo, reply),
    formIsOpen: stateProps.formIsOpen,
    hasReplies: haveReplies[topicId],
    queuedReplies: replies[topicId].queued.length, 
    order,
    permissions,
    parentTopic: topics[parentId] || {content: '', topicId: ''},
    replies: replies[topicId].view.map(tId => {
      return {...topics[tId], count: stateProps.votes[tId], topicId: tId };
    }),
    toggleForm: () => dispatchProps.toggleForm(),
    topic: topics[topicId],
    topicId,
    unqueue: (topicId) => dispatchProps.unqueue(topicId),
    upvote: (topicId, parentId) => dispatchProps.upvote(topicId, parentId)
  });
}

export default connect(
  mapStateToProps,
  {addReply, toggleForm, unqueue, upvote},
  mergeProps
)(TopicContainer);

