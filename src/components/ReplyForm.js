import React, {findDOMNode, Component, PropTypes} from 'react';
import { addReply } from '../actions/actions';

let styles = {
  div: {
    margin: '0.5em'
  }
};
export default class ReplyForm extends Component {

  handleClick = () => {
    const {addReply, topicId } = this.props;
    const node = findDOMNode(this.refs.reply);
    addReply(topicId, { content: node.value.trim() });
    node.value = "";
  }

  render(){
 
    if (!this.props.formIsOpen){
      return <div></div>;
    }

    const { permissions } = this.props;
    const canPost = permissions.post;

    let dyStyles = {
      btn: {
        opacity: canPost ? '1' : '0.4'
      }
    };

    return (
      <div>
        <textarea ref='reply' placeholder=' Go ahead, express yourself!'/>
        <div style={styles.div}>
          <button disabled={!canPost ? true : false }
            onClick={this.handleClick} style={dyStyles.btn}>
            Submit 
          </button>
        </div>
      </div>
    );
  }

}


