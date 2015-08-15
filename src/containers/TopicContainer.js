import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';
import Topic from '../components/Topic';

class TopicContainer extends Component {

  render(){
    console.log('topic contianer props: ', this.props);

    const { dispatch, topic } = this.props;

    return (
      <div>
        Topic Container
        <Topic
          dispatch={dispatch}
          topic = {topic}
        />
      </div>
    );
  }
}

TopicContainer.propTypes = {
  topic: PropTypes.shape({
    content: PropTypes.string.isRequired
  })

};

function mapStateToProps(state){
  const { selectedTopic, topics, replies } = state;
  return {
    topic: topics[selectedTopic] || {content: 'no content'},
    replies: replies[selectedTopic] ?
      replies[selectedTopic].map(tId => topics[tId]) : []
  };
}

export default connect(mapStateToProps)(TopicContainer);

