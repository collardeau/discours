import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import styles from '../styles/reply-item.css';
import cssModules from 'react-css-modules';
import VoteContainer from '../containers/VoteContainer';

@cssModules(styles)
export default class ReplyItem extends Component {

  handleClick = () => {
    const { router } = this.context;
    const { order, reply } = this.props;
    const path = '/' + order + '/' + reply.topicId;
    router.transitionTo(path);    
  }

 render(){

    const { canVote, order, reply } = this.props;

    return (
      <li styleName='item' onClick={ this.handleClick }>
        <div styleName='content'>
          { reply.content }
        </div>
        <VoteContainer topicId = {reply.topicId} reply={reply}/>
     </li>
    );
  }

}

ReplyItem.propTypes = {
  order: PropTypes.oneOf(['new', 'popular']).isRequired,
  reply: PropTypes.shape({
    content: PropTypes.string.isRequired,
    topicId: PropTypes.string.isRequired
  }).isRequired
};

ReplyItem.contextTypes = {
  router: PropTypes.object.isRequired
};


