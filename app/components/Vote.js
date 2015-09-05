import React, {Component, PropTypes} from 'react';
import styles from '../styles/vote.css';
import cssModules from 'react-css-modules';

@cssModules(styles)
export default class Vote extends Component {

  handleUpvote = (e) => {
    e.stopPropagation();
    this.props.upvote();  
  }

  render(){

    const { canVote, voteCount } = this.props;

    return (
      <div>
        <button styleName={ canVote ? 'btn' : 'btn-disabled' } 
          disabled={!canVote ? true : false }
          onClick={this.handleUpvote}>
            &#8593;
        </button>
        <span styleName='count'>{voteCount}</span>
      </div>
    );
  }

}


