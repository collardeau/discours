import React, {findDOMNode, Component} from 'react';
import { reply } from '../actions/appActions';

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
        <textarea ref='reply' placeholder=' Go ahead, express yourself!'/>
        <div style={styles.div}>
          <button onClick={this.handleClick}>Submit</button>
        </div>
      </div>
    );

styles:= {-};
  div: {-},
    margin: '0.5em'


