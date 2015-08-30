import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import ParentTopicContainer from './ParentTopicContainer';
import Topic from '../components/Topic';
import ReplyForm from '../components/ReplyForm';
import Filter from '../components/Filter';
import {addReply, fetchReplies, fetchTopicIfNeeded, toggleForm, 
  unqueueIfNeeded, unsync } from '../actions/actions';

function loadData(props) {
    const { fetchReplies, fetchTopicIfNeeded, topicId } = props;
    fetchTopicIfNeeded(topicId);
    fetchReplies(topicId);
  }

class TopicContainer extends Component { 

  componentDidMount(){
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.topicId !== this.props.topicId){
      this.props.unsync();
      loadData(nextProps);
     }
 }

  componentWillUnmount(){
    this.props.unsync();
  }

  render(){

    const { addReply, canPost, fetchTopicIfNeeded, formIsOpen, order, 
      parentId, queuedReplies, toggleForm, 
      topic, topicId, unqueueIfNeeded } = this.props;

    return (
      <div>
       <ParentTopicContainer
          fetchTopicIfNeeded = {fetchTopicIfNeeded}
          order = {order}
          parentId = { parentId }
        />
        <Topic
          formIsOpen = {formIsOpen}
          order = {order}
          toggleForm = {toggleForm}
          topic = {topic}
          topicId={topicId}
        />
       <ReplyForm
          addReply={addReply}
          canPost={canPost}
          formIsOpen = {formIsOpen}
          topic={topic}
          topicId={topicId}
        />
        <Filter
          order={order}
          queued = {queuedReplies}
          topicId= {topicId}
          unqueueIfNeeded = { unqueueIfNeeded }
        />
        
        { this.props.children }

     </div>
    );
  }
}

function mapStateToProps(state){
  const { formIsOpen, permissions, repliesByNew, topics } = state;

  return {
    formIsOpen,
    permissions,
    repliesByNew,
    topics
  };

}

function mergeProps(stateProps, dispatchProps, parentProps) {

  const 
    { formIsOpen, permissions, repliesByNew, topics } = stateProps,
    canPost = permissions.post,
    topicId = parentProps.params.topicId || 'root',
    routeParams = parentProps.location.pathname.substring(1).split('/'),
    order = routeParams[0] || 'new',
    parentId = topics[topicId] ? topics[topicId].parentId : '',
    topic = topics[topicId] ? topics[topicId] : {},
    queuedReplies = repliesByNew[topicId] ? 
      repliesByNew[topicId].queued.length : 0;

  return Object.assign({}, parentProps, {

    addReply: (inResponseTo, reply) => dispatchProps.addReply(inResponseTo, reply),
    fetchTopicIfNeeded: (topicId, order) => dispatchProps.fetchTopicIfNeeded(topicId, order),
    fetchReplies: topicId => dispatchProps.fetchReplies(topicId),
    toggleForm: () => dispatchProps.toggleForm(),
    unqueueIfNeeded: (topicId) => dispatchProps.unqueueIfNeeded(topicId),
    unsync: () => dispatchProps.unsync(topicId),
 
    canPost,
    formIsOpen,
    queuedReplies,
    order,
    parentId,
    topic,
    topicId
  });
}

export default connect(
  mapStateToProps,
  {addReply, fetchReplies, fetchTopicIfNeeded, toggleForm, unqueueIfNeeded, unsync },
  mergeProps
)(TopicContainer);

