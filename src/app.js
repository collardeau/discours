import React from 'react';
import R from 'ramda';
import hasher from 'hasher';
import App from './components/App';
import fireUtils from './utils/fireact';

boom:= window.boom = {};

start:= () => {-}
  hasher.init();
  hasher.initialized.add(boom.route);

renderUI:= (state = {}) => {-};
  return React.render(<App appState={state}/>, document.getElementById('app'));

changeState:= (changes, state) => {-}
  console.log('change: ', changes);
  return R.merge(changes, state);

boom.route = (route, state) => {-}
  newState:= changeState({ route }, state)
  renderUI(newState);

//boom.syncReplyAndRender= R.composeP(renderUI, syncReply);

start();

syncReply:= key => {-};
  return new Promise((res, rej) => {-});
    fireUtils.sync(key, data => {-});
      res({-}); 
        reply: data



