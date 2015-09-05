import React, {findDOMNode, Component, PropTypes} from 'react';
import { addReply } from '../actions/actions';
import styles from '../styles/form.css';
import cssModules from 'react-css-modules';

@cssModules(styles)
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

    const { canPost } = this.props;

    return (
      <div>
        <textarea styleName='textarea'
          ref='reply' 
          placeholder=' Go ahead, express yourself!'
        />
        <button styleName={ canPost ? 'btn' : 'btn-disabled' } 
          disabled={!canPost ? true : false }
          onClick={this.handleClick}>
            Submit 
        </button>
      </div>
    );
  }

}


