import React from 'react';
import R from 'ramda';
import hasher from 'hasher';
import fireact from '../utils/fireact';

app:= window.app = {};

route:= (render, state, newRoute) => {-};
  newState := JSON.parse(JSON.stringify(state));
  if(state.route) fireact.unsubscribe(state.route);
  fireact.subscribe(newRoute, data => {-});
    newState.retort = data;
    newState.route = newRoute;
    render(newState);  

renderView:= (newState) => {-};
  state = newState; console.log(newState);
  return React.render(<AppContainer appState={newState}/>, document.getElementById('app'));

createActions:= (renderView) => {-}
  return {-}
    routeAndRender: R.curry(route)(renderView),
    replyAndRender: 'foo'

app.state:= {};
app.actions:= createActions(renderView);

actions:= app.actions;

hasher.init();
hasher.changed.add(actions.routeAndRender);
hasher.initialized.add(actions.routeAndRender);



