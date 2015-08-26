import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import Topic from '../components/Topic';
import Warning from '../components/Warning';
import Replies from '../components/Replies';
import ReplyForm from '../components/ReplyForm';
import Filter from '../components/Filter';
import {addReply, clearWarning, fetchDiscour, toggleForm, 
  unqueueIfNeeded, unsync, upvote} from '../actions/actions';

class TopicContainer extends Component {

  componentDidMount(){
    console.log('topic container did mount');
    console.log(this.props);
    const { fetchDiscour, order, topicId } = this.props;
    fetchDiscour(topicId, order);
  }

  componentWillReceiveProps(nextProps){
    const isSameTopic = nextProps.topicId === this.props.topicId;
    const isSameOrder = nextProps.order === this.props.order;

    if(!isSameTopic || !isSameOrder){
      const { fetchDiscour, topicId: previousTopicId, unsync } = this.props;
      const { order, topicId } = nextProps;
      fetchDiscour(topicId, order); // similar logic there, but good for iso?
      if(!isSameTopic){
        unsync(previousTopicId);
      }
    }

 }

  componentWillUnmount(){
    console.log('topic container will unmount');
    //unsync(this.props.topicId);
  }

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
  const order = route.entry;
  const topicId = route.params[0];
  const selectedReplies = order === 'popular' ? repliesByPopular : repliesByNew;

  return {
    formIsOpen,
    haveReplies,
    order,
    permissions,
    topicId,
    topics,
    repliesByNew,
    selectedReplies,
    votes,
    warning
  };

}

function mergeProps(stateProps, dispatchProps, parentProps) {
  const { formIsOpen, haveReplies, order, permissions, 
    selectedReplies, repliesByNew, topics, topicId, warning } = stateProps;

  const parentId = topics[topicId] ? topics[topicId].parentId : 'none';
  const parentTopic = topics[parentId] ? topics[parentId] : {content: '', topicId: ''};
  const topic = topics[topicId] ? topics[topicId] : { content: '', parentId: ''};
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
    fetchDiscour: (topicId, order) => dispatchProps.fetchDiscour(topicId, order),
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
  {addReply, clearWarning, fetchDiscour, 
    toggleForm, unqueueIfNeeded, upvote, unsync
  },
  mergeProps
)(TopicContainer);

