import React from 'react';
import R from 'ramda';
import hasher from 'hasher';
import App from './components/App';
import fireUtils from './utils/fireact';

render:= state => React.render(<App appState={state}/>, document.getElementById('app'));

changeState:= change => {-}
  boom.log.push(change);
  console.log('change: ', change);
  return boom.state = R.merge(boom.state, change);

window.boom= R.pipe(changeState, render);

route:= route => {-};
  if(route==='bonjour') { console.log('bonjour')}
  fireUtils.sync(route, data => {-});
    boom({reply: data, route: route});

syncReply:= key => {-}
  fireUtils.sync(key, data => {-});
    boom({reply: data}) 

boom.state = { reply: { content: 'loading', replies: []}};
boom.log = [];
boom.route = route;
boom.syncReply = syncReply;

hasher.init();
hasher.initialized.add(boom.route);
hasher.changed.add(boom.route);
