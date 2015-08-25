import React from 'react';
import {primary} from '../styles/theme';

let styles = {
  warning: {
    backgroundColor: "hsl(0, 30%, 75%)",
    height: '2.1em',
    lineHeight: '2.1em',
    textAlign: 'center'
  }
};

export default class Warning extends React.Component {

  handleClear = () => {
    console.log('handling clear warning');
    console.log(this.props.clearWarning);
    this.props.clearWarning(); 
  }

  render() {
    const { warning } = this.props;

    if(!warning){
      return <div></div>;
    }

    return (
      <div style={styles.warning} onClick={this.handleClear}>
        { warning }
      </div>
    );
  }

}


