import React from 'react';
import AppContainer from './components/AppContainer';
import hasher from 'hasher';
import fireact from './utils/fireact';
import actions from './actions/appActions' 

state:= {};

renderApp:= (newState) => {-};
  state = newState;
  return React.render(
    <AppContainer appState={state}/>, document.getElementById('app')
  );

actions.init(renderApp);

handleRoute:= newRoute => {-};
  return actions.route(state, newRoute);

// routing
hasher.init();
hasher.changed.add(handleRoute);
hasher.initialized.add(handleRoute);


 

