"use strict";

/**
 * ThumbtackDB - A super simple in-memory key-value store that maintains an index on the count of each value.
 */

var KeyValueStore = require("./KeyValueStore");
var ValueCountIndex = require("./ValueCountIndex");
var Constants = require("./constants");

function ThumbtackDB() {
  this.nameData = new KeyValueStore();
  this.valueIndex = new ValueCountIndex();
}

ThumbtackDB.prototype.set = function(name, value, dbms) {
  // If we are in a transaction, the transaction's value index might not have the count for the previous value at
  // [name], so get it from the DBMS and store the new count in the current transaction.
  var previousValue = dbms.get(name);
  if (previousValue !== Constants.NO_VALUE) {
    this.valueIndex.setCount(previousValue, dbms.numEqualTo(previousValue) - 1);
  }

  this.nameData.put(name, value);

  // Likewise, the value index might not have the actual count of the new value to store at [name], so get it from the
  // DBMS as well and store the new count in the current transaction.
  var newValueCount = dbms.numEqualTo(value);
  this.valueIndex.setCount(value, newValueCount + 1);
};

ThumbtackDB.prototype.get = function(name) {
  return this.nameData.get(name);
};

ThumbtackDB.prototype.unset = function(name, dbms) {
  // The current transaction's copy of the value index might not have the count for the previous value at [name], so get
  // it from the DBMS and store the updated count in the current transaction.
  var previousValue = dbms.get(name);
  this.valueIndex.setCount(previousValue, dbms.numEqualTo(previousValue) - 1);

  this.nameData.delete(name);
};

ThumbtackDB.prototype.numEqualTo = function(value) {
  return this.valueIndex.getCount(value);
};

ThumbtackDB.prototype.merge = function(other) {
  for (var name in other.nameData) {
    this.nameData[name] = other.nameData[name];
  }

  for (var value in other.valueIndex) {
    this.valueIndex[value] = other.valueIndex[value];
  }
};

module.exports = ThumbtackDB;
