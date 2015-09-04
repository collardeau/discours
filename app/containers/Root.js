import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
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


// // give it a name so it reuses the same window
// var win = window.open(null, "redux-devtools", "menubar=no,location=no,resizable=yes,scrollbars=no,status=no");
// // reload in case it's reusing the same window with the old content
//  win.location.reload();
// // wait a little bit for it to reload, then render
// setTimeout(function() {
//    React.render(
//      <DebugPanel top right bottom left>
//        <DevTools select={state => state } store={store} monitor={LogMonitor} />
//      </DebugPanel>, win.document.body);
// }, 10);