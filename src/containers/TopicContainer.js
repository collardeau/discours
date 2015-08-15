import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import Topic from '../components/Topic';
import Replies from '../components/Replies';
import ReplyForm from '../components/ReplyForm';

class TopicContainer extends Component {

  render(){
    console.log('topic container props: ', this.props);

    const { dispatch, topic, topicId, replies } = this.props;

    return (
      <div>
        <Topic
          dispatch={dispatch}
          topic = {topic}
        />
        <ReplyForm
          dispatch={dispatch}
          topicId={topicId}
        />
        <Replies
          dispatch={dispatch}
          replies = {replies}
        />
      </div>
    );
  }
}

TopicContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  topic: PropTypes.shape({
    content: PropTypes.string.isRequired
  }),
  topicId: PropTypes.string.isRequired,
  replies: PropTypes.array.isRequired
};

function mapStateToProps(state){
  const { replies, route, selectedTopic, topics } = state;
  return {
    ordering: route.entry,
    topic: topics[selectedTopic] || {content: 'no content'},
    topicId: selectedTopic,
    replies: replies[selectedTopic] ?
      replies[selectedTopic].map(tId => topics[tId]) : []
  };
}

export default connect(mapStateToProps)(TopicContainer);

