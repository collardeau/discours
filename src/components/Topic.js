import React, { Component, PropTypes } from 'react';

export default class Topic extends Component {

  shouldComponentUpdate(nextProps){
    return true;
    return !nextProps.topic === this.props.topic;
  }

  render(){
    const { content } = this.props.topic;
    return (
      <div>
        <p>{content}</p>
      </div>
    );
  }

}

Topic.propTypes = {
  topic: PropTypes.shape({
    content: PropTypes.string.isRequired
  })
};


