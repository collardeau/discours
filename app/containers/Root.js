import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { loadDevTools } from './ReduxDevTools'; 
//import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import configureStore from '../store/configureStore';
import App from './App';
import TopicContainer from './TopicContainer';
import RepliesContainer from './RepliesContainer';
import PopularContainer from './PopularContainer';
import About from '../components/About';

const store = configureStore();

export default class Root extends Component {
  render(){
    return (
      <div>
        <Provider store={store}>
          {() => 
            <Router history={this.props.history}>
              <Route component={App}>
                <Route path ='/about' component={About} />
                <Route component={TopicContainer}>
                  <Route path='/' component={RepliesContainer} />
                  <Route path='/new/:topicId' component={RepliesContainer} />
                  <Route path='/popular/:topicId' component={PopularContainer} />
                </Route>
              </Route>
                
            </Router>
          }
        </Provider>
     </div>
    );
  }
}

/*global __DEV__*/
if(__DEV__) {
  loadDevTools(store);
}
