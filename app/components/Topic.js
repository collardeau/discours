import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from '../styles/topic.css';
import cssModules from 'react-css-modules';

@cssModules(styles)
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
       <div styleName='topic'>
          <p styleName='content'>{topic.content}</p>
          <span>
            <button styleName='btn' onClick={this.handleToggle}>
              { formIsOpen ? 'Close' : 'Reply' }  
            </button>
          </span>
        </div>
    );
  }
}

Topic.contextTypes = {
  router: PropTypes.object.isRequired
};

Topic.propTypes = {
 topic: PropTypes.shape({
   //content: PropTypes.string.isRequired
  })
};


