import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import {light, white} from '../styles/theme';

let styles = {
 parentTopic: {
    marginBottom: '0.8em',
    display: 'none'
  }
};

@Radium
export default class ParentTopic extends React.Component {

  handleClick = () => {
    const { router } = this.context;
    const { order, parentId } = this.props;
    router.transitionTo('/' + order + '/' + parentId );    
  }

  render(){

    return (
      <div style={styles.topic}>
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

