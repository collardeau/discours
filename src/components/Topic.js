import React, { Component } from 'react';

export default class Topic extends Component {

  render(){
    const { content } = this.props.topic;
    return (
      <div>
        <p>{content}</p>
      </div>
    );
  }

}
