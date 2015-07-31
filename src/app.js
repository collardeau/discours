import React from 'react';
import R from 'ramda';
import hasher from 'hasher';
import App from './components/App';
import fireUtils from './utils/fireact';

render:= state => React.render(<App appState={state}/>, document.getElementById('app'));

changeState:= change => boom.state = R.merge(boom.state, change);

log:= change => {-}
  boom.log.push(change);
  return change;

changeAndRender:= R.pipe(changeState, log, render);

routeChange:= route => ({route});

route:= R.pipe(routeChange, changeAndRender);

syncReplyChange:= key => {-}
  return new Promise((res) => {-});
    fireUtils.sync(key, data => {-});
      console.log(data);
     res({-}); 
       reply: data

syncReply:= R.pipeP(syncReplyChange, changeAndRender);

boom:= window.boom = changeAndRender;
boom.state = {};
boom.log = [];
boom.route = route;
boom.syncReply = syncReply;

hasher.init();
hasher.initialized.add(boom.route);
hasher.changed.add(boom.route);
