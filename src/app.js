import React from 'react';
import R from 'ramda';
import hasher from 'hasher';
import App from './components/App';
import fireUtils from './utils/fireact';

app:= document.getElementById('app');
render:= () => React.render(<App appState={boom.state}/>, app);

change:= changes => {-};
  console.log('changes: ', changes);
  switch(changes.type) {-}
    case "new_reply" :
      boom.state.replies.set(changes.data.key, changes.data)  
      break;
    case "update_vote" :
      boom.state.replies.set(changes.data.key, changes.data)  
      break;
    default:
      R.mapObjIndexed((val, key) => {-}, changes.data);
        boom.state[key] = val;

log:= changes => {-};
  //console.log(changes);
  boom.logs.push(changes);
  return changes;

boom:= window.boom = R.pipe(log, change, render); 

state:= boom.state = {-};
  topic: { content: 'loading'},
  replies: new Map()
boom.logs = [];
boom.lastLog = "";

getTopic:= key => {-};
  fireUtils.fetch('topic', key, data => {-});
    boom({-});
      type: 'new_topic',
      data: { topic: data, route: key}

onReplyAdded:= data => {-};
  boom({-});
    type: 'new_reply',
    data: data

onReplyChanged:= data => {-};
  boom({-});
    type: 'update_vote',
    data: data

unSync:= () => {-};
  if(boom.state.topic.content !== 'loading') {-}
    console.log('unsynching');
    fireUtils.unsync(boom.state.route); 
    boom.state.replies.clear();

syncReplies:= key=>{-};
  unSync();
  fireUtils.syncByCount(key, onReplyAdded, onReplyChanged)

syncNewReplies:= key => {-};
  unSync();
  fireUtils.syncByDate(key, onReplyAdded, onReplyChanged)

route:= route => {-};
  if(route==='bonjour') {-}
    boom({-});
      type: 'route', 
      data: {route}
  else{-}
    getTopic(route);
    syncReplies(route);

reply:= reply => {-};
  fireUtils.reply({-})
    content: reply,
    count: 0,
    parentKey: boom.state.route 

upvote:= fireUtils.upvote;

boom.route = route;
boom.reply = reply;
boom.upvote = upvote;
boom.syncNewReplies = syncNewReplies; 
boom.syncReplies = syncReplies;

hasher.init();
hasher.initialized.add(boom.route);
hasher.changed.add(boom.route);



