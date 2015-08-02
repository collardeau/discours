import React from 'react';
import R from 'ramda';
import hasher from 'hasher';
import App from './components/App';
import fireUtils from './utils/fireact';

boom:= window.boom = changes => {-} 
  // doesn't work on nested objects 
  R.mapObjIndexed((val, key) => {-}, changes);
    boom.state[key] = val;

state:= boom.state = {};
boom.logs = [];
boom.lastLog = "";

app:= document.getElementById('app');
render:= () => React.render(<App appState={boom.state}/>, app);

findChanges:= obsChanges => {-}
  return obsChanges.reduce((prev, next) => {-},{});
    prev[next.name] = next.object[next.name];
    return prev;

log:= newLog => {-}
  boom.logs.push(newLog);
  boom.lastLog= newLog; console.log(newLog);
  return newLog;

change:= R.pipe(findChanges, log, render)

Object.observe(state, change);

route:= route => {-};
  if(route==='bonjour') {-}
    boom({route});
  else{-}
    //cutSync();
    fetchReply(route);

fetchReply:= key => {-}
  fireUtils.fetch('reply', key, data => {-});
    boom({reply: data, route: key});

syncReplies:= key => {-}
  fireUtils.sync('replies', key, data => {-});
    boom({replies: data});

cutSync:= () => {-}
  if(boom.state.reply) fireUtils.unsubscribe(boom.state.reply.key); 

reply:= reply => {-};
  fireUtils.reply({-})
    content: reply,
    count: 0,
    parentKey: boom.state.route 

upvote:= fireUtils.upvote;

boom.route = route;
boom.reply = reply;
boom.upvote = upvote;
boom.syncReplies = syncReplies;

hasher.init();
hasher.initialized.add(boom.route);
hasher.changed.add(boom.route);


