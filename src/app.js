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
    //syncReply(route);
    boom({-})
      route: route,
      reply: {-}
        content: 'what is up',
        count: 5,
        replies: [
          {content: "woke up early on a Sunday", count: 0},
          {content: "really just nothing", count: 3},
          {content: "nothing much", count: 26}
        ]

syncReply:= key => {-}
  fireUtils.sync(key, data => {-});
    boom({reply: data, route: key});

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

hasher.init();
hasher.initialized.add(boom.route);
hasher.changed.add(boom.route);


