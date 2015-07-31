import React from 'react';

export default class ReplyContainer extends React.Component {-}

  componentDidMount(){-}
    boom.syncReply(this.props.replyKey);

  render(){-}

    let {reply} = this.props;

    return (
      <div> 
        <a href="#bonjour">Bonjour</a>
        <a href="#root">Root</a>
        <p>{reply ? reply.content : 'no content' }</p>
      </div> 
    )

