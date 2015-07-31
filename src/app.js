import React from 'react';
import R from 'ramda';
import hasher from 'hasher';
import App from './components/App';
import fireUtils from './utils/fireact';

render:= state => React.render(<App appState={state}/>, document.getElementById('app'));

changeState:= change => {-}
  boom.log.push(change); console.log('change: ', change);
  return boom.state = R.merge(boom.state, change);

window.boom= R.pipe(changeState, render);

syncReply:= key => {-}
  fireUtils.sync(key, data => {-});
    boom({reply: data, route: key});

cutReply:= () => {-}
  if(boom.state.reply) fireUtils.unsubscribe(boom.state.reply.key); 

route:= route => {-};
  if(route==='bonjour') {-}
    boom({route: 'bonjour'}); 
  else{-}
    cutReply();
    syncReply(route);

boom.state = {};
boom.log = [];
boom.route = route;

hasher.init();
hasher.initialized.add(boom.route);
hasher.changed.add(boom.route);
