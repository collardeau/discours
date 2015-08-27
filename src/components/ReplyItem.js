import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

let styles = {
  li: {
    minHeight: '3.4em',
    margin: '0.5em 0',
    padding: '0 0.5em',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px dotted',
    cursor: 'pointer'
  },
  content: {
    width: '80%'
  },
  vote: {
    display: 'flex',
    flexDirection: 'column'
  },
  count: {
    paddingTop: '0.5em',
    textAlign: 'center',
    fontSize: '1.3em'
  }
};

export default class ReplyItem extends Component {

  handleClick = () => {
    const { router } = this.context;
    const { order, reply } = this.props;
    const path = '/' + order + '/' + reply.topicId;
    router.transitionTo(path);    
  }

  handleUpvote = (e) => {
    e.stopPropagation();
    const { parentId, reply } = this.props;
    this.props.upvote(reply.topicId, parentId);  
  }

  render(){

    const { order, canVote, reply } = this.props;

    let dyStyles = {
      btn: {
        opacity: canVote ? '1' : '0.4'
      }
    };

    return (
      <li onClick={ this.handleClick } style={styles.li}>
        <div style={styles.content}>
          { reply.content }
        </div>
        <div style={styles.vote}>
          <button disabled={!canVote ? true : false }
            onClick={this.handleUpvote} style={dyStyles.btn}>
            &#8593;
          </button>
          <span style={styles.count}>{reply.count}</span>
        </div>
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


