import React from 'react';

export default class Content extends React.Component {-}

  handleSubmit = () => {-}
    reply := this.refs.reply.getDOMNode().value;
    boom.reply(reply);
    this.refs.reply.getDOMNode().value = "";

  render(){-}

    return (
      <div>
        <input ref='reply' type='text' />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );

