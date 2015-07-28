import fireact from './utils/fireact';

var ui = function(){};

export default {-}

  init: fn => ui = fn,

  syncConvo: key => fireact.subscribe(key, ui),

  addReply: fireact.addReply,

  upVote: fireact.upVote
    
