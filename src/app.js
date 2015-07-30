import React from 'react';
import R from 'ramda';
import hasher from 'hasher';
import fireact from './utils/fireact';
import App from './components/App';

init:= () => {-}
  hasher.init();
  hasher.initialized.add(boom.routeAndRender);

renderUI:= (changes, state = {app: 'reply-all'}) => {-};
  newState:= R.merge(state, changes);
  return React.render(<App appState={newState}/>, document.getElementById('app'));

route:= route => { return { route } };

boom:= window.boom = {} 
boom.routeAndRender= R.compose(renderUI, route);

init();


