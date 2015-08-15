import React from 'react';
import{ combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import hasher from 'hasher';
import { Provider } from 'react-redux';

import App from './components/App';

const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd(action.type);
  return result;
};

const finalCreateStore = compose(
  applyMiddleware(thunk, logger),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);

const reducer = combineReducers(reducers);

const store = finalCreateStore(reducer);

let rootElement = document.getElementById('app');
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
