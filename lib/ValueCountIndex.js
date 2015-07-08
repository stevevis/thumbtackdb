"use strict";

/**
 * This class maintains a map of value -> count for keeping an index of the count of each value inserted into a
 * ThumbtackDB.
 */

function ValueCountIndex() {
  this.index = {};
}

ValueCountIndex.prototype.setCount = function(value, count) {
  this.index[value] = count;
};

ValueCountIndex.prototype.getCount = function(value) {
  return this.index[value];
};

module.exports = ValueCountIndex;
