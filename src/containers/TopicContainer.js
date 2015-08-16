import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import Topic from '../components/Topic';
import Replies from '../components/Replies';
import ReplyForm from '../components/ReplyForm';
import Filter from '../components/Filter';

class TopicContainer extends Component {

  render(){
    console.log('topic container props: ', this.props);

    const { dispatch, order, topic, topicId, replies } = this.props;

    return (
      <div>
        <Topic
          topic = {topic}
        />
        <Filter
          order={order}
          topicId= {topicId}
        />
        <ReplyForm
          topicId={topicId}
        />
        <Replies
          replies = {replies}
        />
      </div>
    );
  }
}

TopicContainer.propTypes = {
  order: PropTypes.oneOf(['new', 'popular']),
  topic: PropTypes.shape({
    content: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
  }),
  topicId: PropTypes.string.isRequired,
  replies: PropTypes.array.isRequired
};

function mapStateToProps(state){
  const { repliesByDate, repliesByCount, route, selectedTopic, topics } = state;

  const order = route;
  const topicId = selectedTopic;
  const replies = order === 'popular' ? repliesByCount : repliesByDate;

  return {
    order,
    topicId,
    topics,
    replies
  };

}

function mergeProps(stateProps, dispatchProps, parentProps) {
  const { order, replies, topics, topicId } = stateProps;
  return Object.assign({}, parentProps, {
    order,
    replies: replies[topicId].map(tId => topics[tId]),
    topic: topics[topicId],
    topicId
  });
}

export default connect(
  mapStateToProps,
  {},
  mergeProps
)(TopicContainer);

