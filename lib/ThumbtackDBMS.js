"use strict";

/**
 * This is the DBMS for a ThumbtackDB, it serves as the external interface to a ThumbtackDB instance and encapsulates
 * the primary database and the transaction manager for performing transactional operations.
 */

var ThumbtackDB = require("./ThumbtackDB");
var TransactionManager = require("./TransactionManager");
var Constants = require("./constants");

function ThumbtackDBMS() {
  this.database = new ThumbtackDB();
  this.transactionManager = new TransactionManager();
}

ThumbtackDBMS.prototype.set = function(name, value) {
  this.getCurrentDatabase().set(name, value, this);
};

/**
 * Get needs to iterate over the currently open transactions to find the most current value for name.
 */
ThumbtackDBMS.prototype.get = function(name) {
  var result = this.transactionManager.visitTransactions(function(database) {
    var value = database.get(name);
    if (value !== undefined) {
      return value === Constants.DELETED_KEY ? Constants.NO_VALUE : value;
    }
  });

  return result !== undefined ? result : this.database.get(name) || Constants.NO_VALUE;
};

ThumbtackDBMS.prototype.unset = function(name) {
  this.getCurrentDatabase().unset(name, this);
};

/**
 * Get needs to iterate over the currently open transactions to find the most current count for value.
 */
ThumbtackDBMS.prototype.numEqualTo = function(value) {
  var result = this.transactionManager.visitTransactions(function(database) {
    if (database.numEqualTo(value) !== undefined) {
      return database.numEqualTo(value);
    }
  });
  return result !== undefined ? result : this.database.numEqualTo(value) || 0;
};

ThumbtackDBMS.prototype.getCurrentDatabase = function() {
  return this.transactionManager.getCurrentTransaction() || this.database;
};

ThumbtackDBMS.prototype.begin = function() {
  this.transactionManager.openTransaction();
};

ThumbtackDBMS.prototype.rollback = function() {
  if (this.transactionManager.getCurrentTransaction()) {
    this.transactionManager.rollbackCurrentTransaction();
  } else {
    return Constants.NO_TRANSACTION;
  }
};

ThumbtackDBMS.prototype.commit = function() {
  if (this.transactionManager.getCurrentTransaction()) {
    this.transactionManager.commitAllTransactions(this.database);
  } else {
    return Constants.NO_TRANSACTION;
  }
};

module.exports = ThumbtackDBMS;
