"use strict";

/**
 * This class maintains a map of value -> count for keeping an index of the count of each value inserted into a
 * ThumbtackDB.
 */

function ValueCountIndex() {
  this.index = {};
}

ValueCountIndex.prototype.incrementCount = function(value) {
  if (!this.index[value]) {
    this.index[value] = 0;
  }
  this.index[value] += 1;
};

ValueCountIndex.prototype.decrementCount = function(value) {
  if (!this.index[value]) {
    this.index[value] = 0;
  } else {
    this.index[value] -= 1;
  }
};

ValueCountIndex.prototype.setCount = function(value, count) {
  this.index[value] = count;
};

ValueCountIndex.prototype.getCount = function(value) {
  return this.index[value];
};

module.exports = ValueCountIndex;
