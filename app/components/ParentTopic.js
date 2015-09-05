import React, { Component, PropTypes } from 'react';
import styles from '../styles/topic.css';
import cssModules from 'react-css-modules';

@cssModules(styles)
export default class ParentTopic extends React.Component {

  handleClick = () => {
    const { router } = this.context;
    const { order, parentId } = this.props;
    router.transitionTo('/' + order + '/' + parentId );    
  }

  render(){

    return (
      <div styleName='parent-topic'>
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

