import React from 'react';
import styles from '../styles/warning.css';
import cssModules from 'react-css-modules';

@cssModules(styles)
export default class Warning extends React.Component {

  handleClick = () => {
    this.props.clearWarning(); 
  }

  render() {
    const { warning } = this.props;

    if(!warning){
      return <div></div>;
    }

    return (
      <div styleName='warning' onClick={this.handleClick}>
        { warning }
      </div>
    );
  }

}


