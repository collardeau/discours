import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

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
      <div>
       <div>
          <p>{topic.content}</p>
          <span>
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
   //content: PropTypes.string.isRequired
  })
};


