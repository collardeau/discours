import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import Topic from '../components/Topic';
import Replies from '../components/Replies';
import ReplyForm from '../components/ReplyForm';
import Filter from '../components/Filter';
import {addReply, upvote} from '../actions/actions';

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

    const { addReply, order, topic, topicId, replies, upvote } = this.props;
    //return <div>intercept</div>;
    return (
      <div>
        <Topic
          order = {order}
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
          topicId= {topicId}
        />
        <Replies
          order = {order}
          parentId={topicId}
          replies = {replies}
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
  const { repliesByNew, route, selectedTopic, topics, votes } = state;
  const order = route;
  const topicId = selectedTopic;
  //const replies = order === 'popular' ? repliesByCount : repliesByDate;
  const replies = repliesByNew;

  return {
    order,
    topicId,
    topics,
    replies,
    votes
  };

}

function mergeProps(stateProps, dispatchProps, parentProps) {
  const { order, parentId, replies, topics, topicId } = stateProps;
  return Object.assign({}, parentProps, {
    addReply: (inResponseTo, reply) => dispatchProps.addReply(inResponseTo, reply),
    queuedReplies: 0,
    order,
    replies: replies[topicId].view.map(tId => {
      return {...topics[tId], count: stateProps.votes[tId], topicId: tId };
    }),
    topic: topics[topicId],
    topicId,
    upvote: (topicId, parentId) => dispatchProps.upvote(topicId, parentId)
  });
}

export default connect(
  mapStateToProps,
  {addReply, upvote},
  mergeProps
)(TopicContainer);

