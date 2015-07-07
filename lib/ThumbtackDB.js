"use strict";

function ThumbtackDB() {
  this.nameData = {};
  this.valueIndex = {};
}

ThumbtackDB.prototype.set = function(name, value) {
  if (this.nameData[name]) {
    this.valueIndex[this.nameData[name]]--;
  }
  this.nameData[name] = value;

  if (!this.valueIndex[value]) {
    this.valueIndex[value] = 0;
  }
  this.valueIndex[value]++;
};

ThumbtackDB.prototype.get = function(name) {
  return this.nameData[name] || "NULL";
};

ThumbtackDB.prototype.unset = function(name) {
  this.valueIndex[this.nameData[name]]--;
  delete this.nameData[name];
};

ThumbtackDB.prototype.numEqualTo = function(value) {
  return this.valueIndex[value] || 0;
};

module.exports = ThumbtackDB;
