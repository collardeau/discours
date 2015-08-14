import React, { Component, PropTypes } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    console.log('we are in the app component');
  }

  render(){
    return (
      <div>Look here, a brand new app</div>
    );
  }

}

export default App;

