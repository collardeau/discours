import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import configureStore from '../store/configureStore';
import App from './App';

const store = configureStore();

export default class Root extends Component {
  render(){
    return (
      <div>
        <Provider store={store}>
          {() => <App />}
        </Provider>
        <DebugPanel left top bottom>
          <DevTools select={state => state.repliesByNew} store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}
