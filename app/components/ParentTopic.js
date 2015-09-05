import React, { Component, PropTypes } from 'react';

export default class ParentTopic extends React.Component {

  handleClick = () => {
    const { router } = this.context;
    const { order, parentId } = this.props;
    router.transitionTo('/' + order + '/' + parentId );    
  }

  render(){

    return (
      <div>
        <small onClick={this.handleClick}>
          In response to: { this.props.content }
        </small>
     </div>
    );
  }
}

ParentTopic.contextTypes = {
  router: PropTypes.object.isRequired
};

