import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import {light, white} from '../styles/theme';

let styles = {
  topic: {
    backgroundColor: white,
    margin: '0.5em'
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

    const { formIsOpen, order, topic, topicId } = this.props;

    return (
      <div style={styles.topic}>
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

Topic.contextTypes = {
  router: PropTypes.object.isRequired
};

Topic.propTypes = {
 topic: PropTypes.shape({
    content: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired
  })
};


