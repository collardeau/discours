import hasher from 'hasher';

function getRoute(routeTxt) {
  let params = routeTxt.split('/');
  let route = {
    entry: params.shift(),
    params: params
  };
}

export default {
 start: function(cb){
    hasher.init(cb);
    hasher.initialized.add(cb);
    hasher.changed.add(cb);
  }
};

