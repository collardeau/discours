import React from 'react';
import R from 'ramda';
import hasher from 'hasher';
import App from './components/App';
import fireUtils from './utils/fireact';

app:= document.getElementById('app');
render:= () => React.render(<App appState={boom.state}/>, app);

log:= newLog => {-}
  boom.logs.push(newLog);
  boom.lastLog= newLog; console.log(newLog);
  return newLog;

change:= changes => {-} 
  R.mapObjIndexed((val, key) => {-}, changes);
    boom.state[key] = val;
  return changes;

boom:= window.boom = R.pipe(change, log, render); 
  
state:= boom.state = {-};
  replies: new Map()
boom.logs = [];
boom.lastLog = "";

route:= route => {-};
  if(route==='bonjour') {-}
    changes:= {route}
    boom(changes);
  else{-}
    //cutSync();
    fetchReply(route);

fetchReply:= key => {-}
  fireUtils.fetch('reply', key, data => {-});
    changes:= {reply: data, route: key};
    boom(changes);

syncReplies:= key => {-}
  fireUtils.sync('replies', key, data => {-});
    console.log(data);
    changes:= {-}
      replies: boom.state.replies.set(data.key, data)
  
    boom(changes);

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


