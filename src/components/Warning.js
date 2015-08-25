import React from 'react';
import {primary} from '../styles/theme';

let styles = {
  warning: {
    backgroundColor: 'red',
    height: '2.1em',
    lineHeight: '2.1em',
    textAlign: 'center'
  }
};

export default class Warning extends React.Component {

  render() {
    const { warning } = this.props;

    if(!warning){
      return <div></div>;
    }

    return (
      <div style={styles.warning}>
        { warning }
      </div>
    );
  }

}


