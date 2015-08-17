import React, {findDOMNode, Component, PropTypes} from 'react';
import { addReply } from '../actions/actions';

export default class ReplyForm extends Component {

  handleClick = () => {
    const {addReply, topic } = this.props;
    const node = findDOMNode(this.refs.reply);
    const topicId = topic.topicId;
    addReply(topicId, {
      content: node.value.trim(),
      ref: {
        content: topic.content,
        topicId
      } 
    });
    node.value = "";
  }

  render(){

    return (
      <div>
        <textarea ref='reply' placeholder=' Go ahead, express yourself!'/>
        <div>
          <button onClick={this.handleClick}>Submit</button>
        </div>
      </div>
    );
  }

}


