import fireact from './utils/fireact';

var ui; // callback

export default {-}

  init: fn => {-},
    ui = fn; 

  syncConvo: (key) => {-},
    fireact.subscribe(key, ui);

  addReply: (reply) => {-},
    fireact.addReply(reply);

  upVote: (key, parentKey ) => {-}
    fireact.upVote(key, parentKey);
    

