import React from 'react';
import{ combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import { changeRoute, loadTopic} from './actions';

import R from 'ramda';
import hasher from 'hasher';
import App from './components/App';
import fireUtils from './utils/fireact';

createStoreWithMiddleware:= applyMiddleware(thunk)(createStore);
reducer:= combineReducers(reducers);
store:= createStoreWithMiddleware(reducer);

rootElement:= document.getElementById('app');
render:= () => React.render(<App appState={store.getState()}/>,rootElement);
//  <Provider store={store}>
//    {() => <App />}
//  </Provider>,
//  rootElement
//);

let unsubscribe = store.subscribe(() => {-});
  console.log(store.getState());
  render();

handleRoute:= route => {-}
  store.dispatch(changeRoute(route));
  store.dispatch(loadTopic('root'));

//unsubscribe();

hasher.init();
hasher.initialized.add(handleRoute);
hasher.changed.add(handleRoute);






