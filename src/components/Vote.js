import React, {Component, PropTypes} from 'react';

let styles = {
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

export default class Vote extends Component {

  handleUpvote = (e) => {
    e.stopPropagation();
    const { parentId, reply, upvote } = this.props;
    upvote(reply.topicId, parentId);  
  }

  render(){

    const { canVote, reply } = this.props;

    let dyStyles = {
      btn: {
        opacity: canVote ? '1' : '0.4'
      }
    };

    return (
      <div style={styles.vote}>
        <button disabled={!canVote ? true : false }
          onClick={this.handleUpvote} style={dyStyles.btn}>
            &#8593;
        </button>
        <span style={styles.count}>{reply.count}</span>
      </div>
    );
  }

}



