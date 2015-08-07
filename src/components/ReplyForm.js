import React, {findDOMNode, Component} from 'react';
import { reply } from '../actions';

export default class Content extends Component {-}

  handleClick = () => {-}
    node:= findDOMNode(this.refs.reply);
    text:= node.value.trim();
    reply({-});
      content: text,
      count: 0,
      topic: {-}
        key: this.props.topic.key,
        content: this.props.topic.content
    node.value = "";

  render(){-}

    return (
      <div>
        <input ref='reply' type='text' />
        <button onClick={this.handleClick}>Submit</button>
      </div>
    );

