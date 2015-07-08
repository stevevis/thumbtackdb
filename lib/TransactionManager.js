"use strict";

/**
 * Simple transaction manager for ThumbtackDB, opening an transaction creates a new empty ThumbtackDB instance and any
 * operations are applied to that database. When the transaction is commited the primary database is merged with the
 * transaction databases.
 */

var ThumbtackDB = require("./ThumbtackDB");

function TransactionManager() {
  this.transactions = [];
}

TransactionManager.prototype.openTransaction = function() {
  this.transactions.unshift(new ThumbtackDB());
};

TransactionManager.prototype.getCurrentTransaction = function() {
  if (this.transactions.length > 0) {
    return this.transactions[0];
  }
};

TransactionManager.prototype.rollbackCurrentTransaction = function() {
  if (this.transactions.length > 0) {
    this.transactions.shift();
  }
};

/**
 * Visit each transaction from neweest to oldest with the visitor function and return the first valid result returned by
 * the function. The visitor function will be passed the current transaction.
 */
TransactionManager.prototype.visitTransactions = function(visitor) {
  for (var i = 0; i < this.transactions.length; i++) {
    var result = visitor(this.transactions[i]);
    if (result !== undefined) {
      return result;
    }
  }
};

/**
 * Merge each transaction into the primary database, starting from the first opened transaction through to the most
 * recently opened.
 */
TransactionManager.prototype.commitAllTransactions = function(database) {
  if (this.transactions.length > 0) {
    for (var i = this.transactions.length - 1; i >= 0; i--) {
      database.merge(this.transactions[i]);
    }
    this.transactions = [];
  }
};

module.exports = TransactionManager;
