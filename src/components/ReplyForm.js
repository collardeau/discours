import React, {findDOMNode, Component} from 'react';
import { reply } from '../actions';
import RadiumButton from './RadiumButton';

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

    styles:= {-};
      div: {-},
        display: 'flex',
        flexDirection: 'row-reverse'

    return (
      <div>
        <textarea ref='reply' />
        <div style={styles.div}>
          <button onClick={this.handleClick}>Submit</button>
        </div>
      </div>
    );

