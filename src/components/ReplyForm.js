import React, {findDOMNode, Component} from 'react';
//import { reply } from '../actions/appActions';
import { addReply } from '../actions/actions';

export default class Content extends Component {

  handleClick = () => {
    const {dispatch, topicId } = this.props;
    let node = findDOMNode(this.refs.reply);
    let text = node.value.trim();
    dispatch(addReply(topicId, {
      content: text
    }));
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
