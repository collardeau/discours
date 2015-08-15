import React, { Component } from 'react';

export default class Replies extends React.Component {

  render(){
    //key on topicId?
    return (
      <ul>
        { this.props.replies.map((reply, i) =>
          <li key={i}>{ reply.content }</li>
        )}
      </ul>
    );

  }
}

