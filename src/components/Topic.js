import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
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

  handleToggle = () => {
    this.props.toggleForm();
  }

  render(){

    const { formIsOpen, order, parentTopic, topic, topicId } = this.props;

    let dynamicStyles = {
      parentTopic: {
        display: topicId === 'root' ? 'none' : 'block'
      }
    };
 
    return (
      <div style={styles.topic}>
        <div style={[styles.parentTopic, dynamicStyles.parentTopic]}>
          <small>
            <Link to={`/${order}/${topic.parentId}`}>
              In response to: { parentTopic.content}
            </Link>
          </small>
        </div> 
        <div style={styles.flex}>
          <p style={styles.content}>{topic.content}</p>
          <span style={styles.child}>
            <button onClick={this.handleToggle}>
              { formIsOpen ? 'Close' : 'Reply' }  
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


