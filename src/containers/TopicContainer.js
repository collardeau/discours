import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import Topic from '../components/Topic';
import Replies from '../components/Replies';
import ReplyForm from '../components/ReplyForm';
import Filter from '../components/Filter';
import {addReply} from '../actions/actions';

class TopicContainer extends Component {

  render(){

    console.log('topic container props: ', this.props);

    const { addReply, order, parentTopic, topic, topicId, replies } = this.props;

    //return <div>intercept</div>;
    return (
      <div>
        <Topic
          parentTopic = {parentTopic}
          topic = {topic}
        />
       <ReplyForm
          addReply={addReply}
          topic={topic}
          topicId={topicId}
        />
        <Filter
          order={order}
          topicId= {topicId}
        />
        <Replies
          order = {order}
          replies = {replies}
        />
      </div>
    );
  }
}

TopicContainer.propTypes = {
  addReply: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['new', 'popular']).isRequired,
  parentTopic: PropTypes.shape({
    topicId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }),
  topic: PropTypes.shape({
    content: PropTypes.string.isRequired
  }),
  topicId: PropTypes.string.isRequired
  //replies: PropTypes.array.isRequired
};

function mapStateToProps(state){
  const { repliesByNew, route, selectedTopic, topics } = state;
  const order = route;
  const topicId = selectedTopic;
  //const replies = order === 'popular' ? repliesByCount : repliesByDate;
  const replies = repliesByNew;

  return {
    order,
    topicId,
    topics,
    replies
  };

}

function mergeProps(stateProps, dispatchProps, parentProps) {
  const { order, parentId, replies, topics, topicId } = stateProps;
  return Object.assign({}, parentProps, {
    addReply: (inResponseTo, reply) => dispatchProps.addReply(inResponseTo, reply),
    order,
    parentTopic: {content: 'none', topicId: 'none' }, // temp
    replies: replies[topicId].map(tId => {
      return {...topics[tId], topicId: tId };
    }),
    topic: topics[topicId],
    topicId
  });
}

export default connect(
  mapStateToProps,
  {addReply},
  mergeProps
)(TopicContainer);

