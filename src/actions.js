import fireact from './utils/fireact';
import R from 'ramda';

var ui; 

syncConvo:= (key) => fireact.subscribe(ui, key);

init:= fn => ui = fn;

export default {-}

  init: init,
  
  syncConvo: syncConvo,

  addReply: fireact.addReply,

  upVote: fireact.upVote
    
