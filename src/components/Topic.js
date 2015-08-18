import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import {light, white} from '../styles/theme';

let styles = {
  topic: {
    backgroundColor: white,
    margin: '0.5em'
  },
  parentTopic: {
    marginBottom: '0.8em',
    display: 'none'
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

@Radium
export default class Topic extends Component {

  shouldComponentUpdate(nextProps){
    return true;
  }

  handleClick = (e) => {
    e.preventDefault();
    window.location.hash = '' +
      this.props.order + '/' +
      this.props.topic.parentId;
  }

  render(){

    const { parentTopic, topic, topicId } = this.props;

    let dynamicStyles = {
      parentTopic: {
        display: topicId === 'root' ? 'none' : 'block'
      }
    };
 
    return (
      <div style={styles.topic}>
        <div style={[styles.parentTopic, dynamicStyles.parentTopic]}>
          <small>
            In response to: <a href='' onClick={this.handleClick}>{ parentTopic.content}</a>
          </small>
        </div> 
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
 topic: PropTypes.shape({
    content: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired
  })
};


