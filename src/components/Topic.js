import React, { Component, PropTypes } from 'react';
import {light, white} from '../styles/theme';

let styles = {
  topic: {
    backgroundColor: white,
    padding: '0.5em'
  },
  parentTopic: {
    marginBottom: '0.8em'
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  content: {
    margin: 0,
    fontSize: '1.3em'
  }
};

export default class Topic extends Component {

  shouldComponentUpdate(nextProps){
    return true;
    //return !nextProps.topic === this.props.topic;
  }

  render(){
    const { parentTopic, topic } = this.props;
    return (
      <div styles={styles.topic}>
        { parentTopic.topicId === 'none' ? '' :
        <span>in response to: Parent Topic</span> }
        <div style={styles.flex}>
          <p style={styles.content}>{topic.content}</p>
          <span style={styles.child}>
            <button onClick={this.handleToggle}>
              Reply
            </button>
          </span>
        </div>
      </div>
    );
  }
}

Topic.propTypes = {
  parentTopic: PropTypes.shape({
    topicId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }),
  topic: PropTypes.shape({
    content: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
  })
};


