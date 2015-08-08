import React from 'react';
import{ combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import { changeRoute, login } from './actions';

import hasher from 'hasher';
import App from './components/App';

createStoreWithMiddleware:= applyMiddleware(thunk)(createStore);
reducer:= combineReducers(reducers);
store:= createStoreWithMiddleware(reducer);

let rootElement= document.getElementById('app');
let render= () => React.render(
  <App appState={store.getState()}/>,
    rootElement
);

let unsubscribe= store.subscribe(() => {
  //console.log(store.getState());
  render();
});

handleRoute:= route => {-}
  store.dispatch(login());  
  store.dispatch(changeRoute(route));

//unsubscribe();

hasher.init();
hasher.initialized.add(handleRoute);
hasher.changed.add(handleRoute);



