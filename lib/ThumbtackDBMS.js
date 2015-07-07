"use strict";

var ThumbtackDB = require("./ThumbtackDB");
var Transaction = require("./Transaction");

function ThumbtackDBMS() {
  this.database = new ThumbtackDB();
  this.transactions = [];
}

ThumbtackDBMS.prototype.set = function(name, value) {
  this.getCurrentDatabase().set(this, name, value);
};

ThumbtackDBMS.prototype.get = function(name) {
  for (var i = 0; i < this.transactions.length; i++) {
    var database = this.transactions[i].getDatabase();
    if (database.get(name) !== undefined) {
      return database.get(name);
    }
  }
  return this.database.get(name) || "NULL";
};

ThumbtackDBMS.prototype.unset = function(name) {
  this.getCurrentDatabase().unset(this, name);
};

ThumbtackDBMS.prototype.numEqualTo = function(value) {
  for (var i = 0; i < this.transactions.length; i++) {
    var database = this.transactions[i].getDatabase();
    if (database.numEqualTo(value) !== undefined) {
      return database.numEqualTo(value);
    }
  }
  return this.database.numEqualTo(value) || 0;
};

ThumbtackDBMS.prototype.getCurrentDatabase = function() {
  if (this.transactions.length > 0) {
    return this.transactions[0].getDatabase();
  } else {
    return this.database;
  }
};

ThumbtackDBMS.prototype.begin = function() {
  this.transactions.unshift(new Transaction());
};

ThumbtackDBMS.prototype.rollback = function() {
  if (this.transactions.length > 0) {
    this.transactions.shift();
  } else {
    return "NO TRANSACTION";
  }
};

module.exports = ThumbtackDBMS;
