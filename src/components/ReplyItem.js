import React, {Component, PropTypes} from 'react';

let styles = {
  li: {
    minHeight: '3.4em',
    margin: '0.5em 0',
    padding: '0 0.5em',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px dotted'
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

  render(){

    const { reply } = this.props;

    return (
      <li style={styles.li}>
        <div style={styles.content}>{ reply.content }</div>
        <div style={styles.vote}>
          <button>
            &#8593;
          </button>
          <span style={styles.count}>{reply.count}</span>
        </div>
      </li>
    );
  }

}

ReplyItem.propTypes = {
  reply: PropTypes.shape({
    content: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
  }).isRequired
};



