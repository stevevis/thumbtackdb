"use strict";

var KeyValueStore = require("./KeyValueStore");
var ValueCountIndex = require("./ValueCountIndex");

function ThumbtackDB() {
  this.nameData = new KeyValueStore();
  this.valueIndex = new ValueCountIndex();
}

ThumbtackDB.prototype.set = function(dbms, name, value) {
  // The current transaction's copy of the value index might not have the count for the previous value at [name], so get
  // it from the DBMS and store the updated count in the current transaction.
  var previousValue = dbms.get(name);
  if (previousValue !== "NULL") {
    this.valueIndex.setCount(previousValue, dbms.numEqualTo(previousValue) - 1);
  }

  this.nameData.put(name, value);
  this.valueIndex.incrementCount(value);
};

ThumbtackDB.prototype.get = function(name) {
  return this.nameData.get(name);
};

ThumbtackDB.prototype.unset = function(dbms, name) {
  // The current transaction's copy of the value index might not have the count for the previous value at [name], so get
  // it from the DBMS and store the updated count in the current transaction.
  var previousValue = dbms.get(name);
  this.valueIndex.setCount(previousValue, dbms.numEqualTo(previousValue) - 1);

  this.nameData.delete(name);
};

ThumbtackDB.prototype.numEqualTo = function(value) {
  return this.valueIndex.getCount(value);
};

module.exports = ThumbtackDB;
