import React from 'react';
import Content from './Content';

export default class ReplyContainer extends React.Component {-}

  shouldComponentUpdate(){-}
    return true;

  render(){-}

    let {reply} = this.props;

    return (
      <div> 
        <Content reply={reply}/>
      </div> 
    )

