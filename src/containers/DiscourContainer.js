import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import Topic from '../components/Topic';
import Warning from '../components/Warning';
import RepliesContainer from './RepliesContainer';
import ReplyForm from '../components/ReplyForm';
import Filter from '../components/Filter';
import {addReply, clearWarning, fetchTopicIfNeeded, toggleForm, 
  unqueueIfNeeded, unsync } from '../actions/actions';

function loadData(props) {
    const { fetchTopicIfNeeded, topicId } = props;
    fetchTopicIfNeeded(topicId);
  }

class DiscourContainer extends Component { //DiscourContainer

  componentDidMount(){
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.topicId !== this.props.topicId){
      //unsync(this.props.topicId);
      loadData(nextProps);
     }
 }

  componentWillUnmount(){
    console.log('topic container will unmount');
    //unsync(this.props.topicId);
  }

  render(){

    const { addReply, canPost, canVote, clearWarning, formIsOpen, order, 
      parentTopic, queuedReplies, toggleForm, 
      topic, topicId, unqueueIfNeeded, warning } = this.props;

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
        
        <div>
        { React.cloneElement(this.props.children, {
          canVote,
          topicId
          })
        }
        </div>
     </div>
    );
  }
}

function mapStateToProps(state){
  const { formIsOpen, permissions, 
    repliesByNew, topics, votes, warning } = state;

  return {
    formIsOpen,
    permissions,
    repliesByNew, // for queue
    topics,
    votes,
    warning
  };

}

function mergeProps(stateProps, dispatchProps, parentProps) {
  const { formIsOpen, permissions, repliesByNew, topics, warning } = stateProps;

  const
    topicId = parentProps.params.topicId || 'root',
    order = parentProps.params.order || 'new',
    parentId = topics[topicId] ? topics[topicId].parentId : 'none',
    parentTopic = topics[parentId] ? topics[parentId] : {content: '', topicId: ''},
    topic = topics[topicId] ? topics[topicId] : { content: '', parentId: ''},
    queuedReplies = repliesByNew[topicId] ? repliesByNew[topicId].queued.length : 0;

  return Object.assign({}, parentProps, {

    addReply: (inResponseTo, reply) => dispatchProps.addReply(inResponseTo, reply),
    clearWarning: () => dispatchProps.clearWarning(), // should be app wide
    fetchTopicIfNeeded: (topicId, order) => dispatchProps.fetchTopicIfNeeded(topicId, order),
    toggleForm: () => dispatchProps.toggleForm(),
    unqueueIfNeeded: (topicId) => dispatchProps.unqueueIfNeeded(topicId),
    //unsync: (topicId) => dispatchProps.unsync(topicId),
 

    canPost: stateProps.permissions.post,
    canVote: stateProps.permissions.vote,
    formIsOpen: stateProps.formIsOpen,
    queuedReplies,
    order,
    parentTopic,
    topic,
    topicId,
    warning
  });
}

export default connect(
  mapStateToProps,
  {addReply, clearWarning, fetchTopicIfNeeded,
    toggleForm, unqueueIfNeeded, unsync
  },
  mergeProps
)(DiscourContainer);

