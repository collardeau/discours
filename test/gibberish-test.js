"use strict";

var should = require("chai").should();

function validate(input){
  var regex = /\w{2}/
  return regex.test(input);
}

function isGibberish(s) {
  // http://www.webdeveloper.com/forum/showthread.php?157846.htmlj  
  var v=1, c=1, ratio, len, gibberish=false;
  
  if(typeof s != 'undefined' && s.length) {
    
    len=s.length;
  
    for(var i=0; i<len; i++) {
      if(/[aeiou]/i.test(s.charAt(i))) v++;
    } else {
      if(/[bcdfghjklmnpqrstvwxyz]/i.test(s.charAt(i))) c++; 
    }
   
    ratio=v/(c+v);
 
    if(ratio < 0.2 || ratio >0.6)
      gibberish=true;
    }
  }
 
  return gibberish;
}

describe("validates input against gibberish", function () {

  var input;

  describe("passes with normal english", function () {
    it("passes with hello", function () {
      input = 'hello';
      validate(input).should.equal(true);
    });

    it("passes with bye", function () {
      input = 'bye';
      validate(input).should.equal(true);
    });
    
     it("passes with I eat", function () {
      input = 'I eat';
      validate(input).should.equal(true);
    });

    it("passes", function () {
      input = 'You are awesome';
      validate(input).should.equal(true);
    });
 
  });

  describe("fails with only one letter", function () {

    it("fails with a simple h", function () {
      input = 'b';
      validate(input).should.equal(false);
    });

    it("fails with a three letter nonesense", function () {
      input = 'zkw';
      validate(input).should.equal(false);
    });


  });


});


