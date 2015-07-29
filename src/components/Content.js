import React from 'react';
import Item from './Item';
import actions from '../actions';

export default class Content extends React.Component {-}

  handleSubmit = () => {-}
    reply := this.refs.reply.getDOMNode().value;
    console.log(this.props.appState);
    actions.addReply({-});
      content: reply,
      count: 0,
      parentKey: this.props.appState.key

  render(){-}

    let { content, replies } = this.props.appState;

    items := replies.map((item, key) => <Item key={key} item={item} />);

    return (
      <main>
        <h3>{content}</h3>
        <input ref='reply' type='text' />
        <button onClick={this.handleSubmit}>Submit</button>
        <ul>{items}</ul>
      </main>);

