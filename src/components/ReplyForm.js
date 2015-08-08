import React, {findDOMNode, Component} from 'react';
import { reply } from '../actions';

export default class Content extends Component {-}

  handleClick = () => {-}
    node:= findDOMNode(this.refs.reply);
    text:= node.value.trim();
    reply({-});
      content: text,
      topic: {-}
        key: this.props.topic.get('key'),
        content: this.props.topic.get('content')
    node.value = "";

  render(){-}

    return (
      <div>
        <textarea rows="3" cols="40" ref='reply' />
        <br />
        <button onClick={this.handleClick}>Submit</button>
      </div>
    );

