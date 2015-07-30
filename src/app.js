import React from 'react';
import R from 'ramda';
import hasher from 'hasher';
import App from './components/App';
import fireUtils from './utils/fireact';

render:= state => React.render(<App appState={state}/>, document.getElementById('app'));

changeState:= (state, change) => {-}
  boom.log = [change];
  console.log('state ', state);
  console.log('change ', change);
  return R.merge(state, change);

boom:= window.boom = {};
boom.change = R.compose(render, changeState);
boom.sync = state => {-};
  fireUtils.sync(state.route, data => {-});
    boom.change(state, data);

handleStart:= (route) => boom.change({}, {route})

hasher.init();
hasher.initialized.add(handleStart);

syncReply:= key => {-};
  return new Promise((res, rej) => {-});
    fireUtils.sync(key, data => {-});
      res({-}); 
        reply: data



