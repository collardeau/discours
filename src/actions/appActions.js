import fireact from '../utils/fireact';
import R from 'ramda';

var render, routeAndRender;

var actions;

route:= (render, state, newRoute) => {-};
  newState := JSON.parse(JSON.stringify(state));
  if(state.route) fireact.unsubscribe(state.route);
  fireact.subscribe(newRoute, data => {-});
    newState.retort = data;
    render(newState);  

create:= (ui) => {-};
  return {-}
    routeAndRender: R.curry(route)(ui)

export default {-}

  create: create,

  routeAndRender: routeAndRender,

  retort: (state, retort) => {-}
    console.log('retort');

