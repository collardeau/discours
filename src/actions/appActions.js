import fireact from '../utils/fireact';

var render; 

export default {-}

  init: fn => render = fn,

  route: (state, newRoute) => {-}
    var newState; 
    if(state.route) fireact.unsubscribe(state.route);
    fireact.subscribe(newRoute, data => {-});
      newState = JSON.parse(JSON.stringify(state)); // immutables?
      newState.retort = data;
      newState.route = newRoute;
      render(newState);  

      //state.route = newRoute;
      //state.retort = data;
      //render();


