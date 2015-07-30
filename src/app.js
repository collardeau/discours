import React from 'react';
import R from 'ramda';
import hasher from 'hasher';
import App from './components/App';
import fireUtils from './utils/fireact';

render:= (state) => {-};
  return React.render(<App appState={state}/>, document.getElementById('app'));

changeState:= (change, state) => {-}
  console.log('change: ', change);
  return R.merge(state, change);

boom:= window.boom = (state={}, change) => {-};
  newState:= changeState(state, change)
  boom.log = ['log 1', 'log 2'];
  render(newState);

handleStart:= (route) => {-};
  boom({route})

hasher.init();
hasher.initialized.add(handleStart);


syncReply:= key => {-};
  return new Promise((res, rej) => {-});
    fireUtils.sync(key, data => {-});
      res({-}); 
        reply: data



