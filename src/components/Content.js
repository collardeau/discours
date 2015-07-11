import React from 'react';
import Item from './Item';

let styles = {
  title: {
    textAlign: 'left'
  }
};

export default class Content extends React.Component {

  handleSubmit = () => {
    let msg = this.refs.msg.getDOMNode().value;
  }

  render(){

    let { content, res } = this.props.appState;
    let items = res.map((item, key) => <Item key={key}>{item.content}</Item>);

    return (
      <main style={styles.title}>
        <h3>{content}</h3>
        <input ref='msg' type='text' />
        <button onClick={this.handleSubmit}>Submit</button>
        <ul>{items}</ul>
      </main>
    );
  }
}

