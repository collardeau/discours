import React from 'react';
import Item from './Item';

styles := {-}
  title: {-}
     textAlign: 'left',
     backgroundColor: 'green'

export default class Content extends React.Component {-}

  handleSubmit = () => {-}
    msg := this.refs.msg.getDOMNode().value;
    this.props.change({-}); // need to add
      res: [ { content: 'msg '}]

  render(){-}
    let { content, res } = this.props.appState;
    items := res.map((item, key) => <Item key={key}>{item.content}</Item>);

    return (
      <main style={styles.title}>
        <h3>{content}</h3>
        <input ref='msg' type='text' />
        <button onClick={this.handleSubmit}>Submit</button>
        <ul>{items}</ul>
      </main>);

