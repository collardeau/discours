import React from 'react';

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
      <div onClick={this.handleClick}>
        { warning }
      </div>
    );
  }

}


