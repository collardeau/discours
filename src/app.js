import React from 'react';
import{ combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import hasher from 'hasher';
import { changeRoute, login } from './actions';
import { Provider } from 'react-redux';

import App from './components/App';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);
const reducer= combineReducers(reducers);
const store= finalCreateStore(reducer);

let rootElement= document.getElementById('app');
React.render(
  <div>
    <Provider store={store}> 
      {() => <App />} 
    </Provider> 

</div>,
  rootElement

);

//<DebugPanel top right bottom>
//    <DevTools store={store}
//              select={state => state.replies}
//              monitor={LogMonitor}>
//    </DevTools>
//  </DebugPanel>
 
