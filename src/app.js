import React from 'react';
import R from 'ramda';
import hasher from 'hasher';
import App from './components/App';
import fireUtils from './utils/fireact';

app:= document.getElementById('app');
render:= () => React.render(<App appState={boom.state}/>, app);

change:= changes => { 
  console.log('changes: ', changes);
  switch(changes.type){-}
    case "new_reply" :
      boom.state.replies.set(changes.data.key, changes.data)  
      break;
    default:
      R.mapObjIndexed((val, key) => {-}, changes.data);
        boom.state[key] = val;
}

log:= changes => {-}
  //console.log(changes);
  boom.logs.push(changes);
  return changes;

boom:= window.boom = R.pipe(log, change, render); 

state:= boom.state = {-};
  replies: new Map()
boom.logs = [];
boom.lastLog = "";

route:= route => {-};
  if(route==='bonjour') {-}
    changes:= {type: 'route', data: {route: route}}
    boom(changes);
  else{-}
    //cutSync();
    getTopic(route);

getTopic:= key => {-}
  fireUtils.fetch('topic', key, data => {-});
    changes:= {type: 'new_topic', data: {topic: data, route: key}};
    boom(changes);

syncReplies:= key => {-}
  fireUtils.sync('replies', key, data => {-});
    changes:= {type: 'new_reply', data: data };
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


