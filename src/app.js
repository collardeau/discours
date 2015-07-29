import React from 'react';
import hasher from 'hasher';
import appActions from './actions/appActions' 
import AppContainer from './components/AppContainer';

state:= {};

renderApp:= (newState) => {-};
  state = newState; console.log(newState);
  return React.render(<AppContainer appState={newState}/>, document.getElementById('app'));

actions:= appActions.create(renderApp);

handleRoute:= newRoute => actions.routeAndRender(state, newRoute);

hasher.init();
hasher.changed.add(handleRoute);
hasher.initialized.add(handleRoute);


