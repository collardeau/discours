import React, {findDOMNode, Component, PropTypes} from 'react';
import { addReply } from '../actions/actions';

let styles = {
  div: {
    //margin: '0.5em'
  }
};
export default class ReplyForm extends Component {

  handleClick = () => {
    const {addReply, topic, topicId } = this.props;
    const node = findDOMNode(this.refs.reply);
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
        <div styles={styles.div}>
          <button onClick={this.handleClick}>Submit</button>
        </div>
      </div>
    );
  }

}


