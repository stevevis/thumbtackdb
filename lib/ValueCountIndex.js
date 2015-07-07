"use strict";

function ValueCountIndex() {
  this.index = {};
}

ValueCountIndex.prototype.incrementCount = function(value) {
  if (!this.index[value]) {
    this.index[value] = 0;
  }
  this.index[value] += 1;
  //console.log("Index:\t" + JSON.stringify(this.index));
};

ValueCountIndex.prototype.decrementCount = function(value) {
  if (!this.index[value]) {
    this.index[value] = 0;
  } else {
    this.index[value] -= 1;
  }
  //console.log("Index:\t" + JSON.stringify(this.index));
};

ValueCountIndex.prototype.setCount = function(value, count) {
  this.index[value] = count;
  //console.log("Index:\t" + JSON.stringify(this.index));
};

ValueCountIndex.prototype.getCount = function(value) {
  return this.index[value];
};

module.exports = ValueCountIndex;
