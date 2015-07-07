"use strict";

var ThumbtackDB = require("./ThumbtackDB");

function Transaction() {
  this.database = new ThumbtackDB();
}

Transaction.prototype.getDatabase = function() {
  return this.database;
};

module.exports = Transaction;
