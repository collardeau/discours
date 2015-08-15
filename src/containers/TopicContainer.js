import React, { Component, PropTypes } from 'react';
import {connect } from 'react-redux';

class TopicContainer extends Component {

  render(){
    console.log('topic props: ', this.props);
    return (
      <div>
        <br />Look here, a brand new app
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

