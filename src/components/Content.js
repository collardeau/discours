import React from 'react';
import Item from './Item';

export default class Content extends React.Component {-}

  handleSubmit = () => {-}
    msg := this.refs.msg.getDOMNode().value;
    this.props.change({-}); // need to add
      replies: [ { content: 'msg '}]

  render(){-}
    let { content, replies } = this.props.appState;

    items := replies.map((item, key) => <Item key={key} item={item} />);

    return (
      <main>
        <h3>{content}</h3>
        <input ref='msg' type='text' />
        <button onClick={this.handleSubmit}>Submit</button>
        <ul>{items}</ul>
      </main>);

