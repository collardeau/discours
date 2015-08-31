import React from 'react';
import {primary} from '../styles/theme';

let styles = {
  h1: {
    textAlign: 'center'
  },
  warning: {
    backgroundColor: "hsl(180, 30%, 75%)",
    width: '80%',
    margin: '0.8em auto',
    padding: '0.8em'
  }
};

export default class About extends React.Component {

  render() {

    return (
      <div style={styles.warning}>
        <h1 style={styles.h1}>ABOUT DISCOURS</h1>
        <p>You can upvote replies as much as you want, but only once per 3 seconds.</p>
        <p>Each reply has its own set of replies. Just click on one to read further down that path.</p>
        <p>Everything is anonymous (voting and posting). It does not matter who you are, only what you say.</p>
        <p><i>You cant take it back</i>. Once you submit a reply, you cannot edit or delete it.</p>
        <p>You can post as much as you want, but only once per 2 minutes.</p>
      </div>
    );
  }

}


