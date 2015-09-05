import React, {Component, PropTypes} from 'react';

export default class Vote extends Component {

  handleUpvote = (e) => {
    e.stopPropagation();
    this.props.upvote();  
  }

  render(){

    const { canVote, voteCount } = this.props;

    return (
      <div>
        <button disabled={!canVote ? true : false }
          onClick={this.handleUpvote}>
            &#8593;
        </button>
        <span>{voteCount}</span>
      </div>
    );
  }

}


