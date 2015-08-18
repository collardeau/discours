import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import Topic from '../components/Topic';
import Replies from '../components/Replies';
import ReplyForm from '../components/ReplyForm';
import Filter from '../components/Filter';
import {addReply, unqueue, upvote} from '../actions/actions';

class TopicContainer extends Component {

  componentDidMount(){
    //console.log('topic container mount');
    //console.log(this.props);
  }

  componentWillReceiveProps(){
    //console.log('topic container will receive props');
    //console.log(this.props);
  }

  render(){
    console.log('topic container props: ', this.props);

    const { addReply, hasReplies, order, parentTopic, queuedReplies, 
      topic, topicId, replies, unqueue, upvote } = this.props;

    //return <div>intercept</div>;
    return (
      <div>
        <Topic
          order = {order}
          parentTopic = {parentTopic}
          topic = {topic}
          topicId={topicId}
        />
       <ReplyForm
          addReply={addReply}
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
  const { haveReplies, repliesByNew, route, selectedTopic, topics, votes } = state;
  const order = route;
  const topicId = selectedTopic;
  //const replies = order === 'popular' ? repliesByCount : repliesByDate;
  const replies = repliesByNew;

  return {
    haveReplies,
    order,
    topicId,
    topics,
    replies,
    votes
  };

}

function mergeProps(stateProps, dispatchProps, parentProps) {
  const { haveReplies, order, replies, topics, topicId } = stateProps;
  const parentId = topics[topicId].parentId;

  return Object.assign({}, parentProps, {
    addReply: (inResponseTo, reply) => dispatchProps.addReply(inResponseTo, reply),
    hasReplies: haveReplies[topicId],
    queuedReplies: replies[topicId].queued.length, 
    order,
    parentTopic: topics[parentId] || {content: ''},
    replies: replies[topicId].view.map(tId => {
      return {...topics[tId], count: stateProps.votes[tId], topicId: tId };
    }),
    topic: topics[topicId],
    topicId,
    unqueue: (topicId) => dispatchProps.unqueue(topicId),
    upvote: (topicId, parentId) => dispatchProps.upvote(topicId, parentId)
  });
}

export default connect(
  mapStateToProps,
  {addReply, unqueue, upvote},
  mergeProps
)(TopicContainer);

