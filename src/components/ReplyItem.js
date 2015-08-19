import React, {Component, PropTypes} from 'react';

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

  handleLink = () => {
    let { order, reply } = this.props;
    window.location.hash = order + '/' + reply.topicId;
  }

  handleUpvote = (e) => {
    e.stopPropagation();
    const { parentId, reply } = this.props;
    this.props.upvote(reply.topicId, parentId);  
  }

  render(){

    const { permissions, reply } = this.props;
    console.log('can vote: ', permissions.vote);

    return (
      <li onClick={this.handleLink } style={styles.li}>
        <div style={styles.content}>{ reply.content }</div>
        <div style={styles.vote}>
          <button onClick={this.handleUpvote}>
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
    count: PropTypes.number.isRequired,
    topicId: PropTypes.string.isRequired
  }).isRequired
};


