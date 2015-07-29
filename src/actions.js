import fireact from './utils/fireact';
import R from 'ramda';

var ui; 

syncConvo:= (key) => fireact.subscribe(key, ui);

changeConvo:= convo => {-}
  fireact.unsubscribe(convo.parentKey);
  ui({key: convo.key});
  syncConvo(convo.key, ui); 

init:= fn => {-};
  ui = fn;
  //ui({key: 'root'})
  //syncConvo = (key) => console.log('yo'); // no effect?

export default {-}

  init: init,
  
  syncConvo: syncConvo,

  changeConvo: changeConvo,

  addReply: fireact.addReply,

  upVote: fireact.upVote
    
