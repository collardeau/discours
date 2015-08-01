("use strict");
var should = require("chai").should();
var R = require("ramda");

describe("works with Object.observe", function () {

  var state= {};
  var log= [];

  var change = function(changes){
    var nLog = changes.reduce(function(prev, next){
      prev[next.name] = next.object[next.name];
      return prev;
    },{});
    log.push(nLog);
    render(state);
  };

  var changeState = function(state, changes){
    var nLog = createLog(changes);
    log.push(nLog);
  }

  Object.observe(state, change);

  it('works', function(){
    //state.route = 'about';
    //state.should.deep.equal({route: 'about'});
  });
  
  it('logs', function(){
    state.user = 'tonton';
    log.should.deep.equal([{user: 'tonton'}]);
  });
     
});
