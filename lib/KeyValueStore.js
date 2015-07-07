"use strict";

function KeyValueStore() {
  this.data = {};
}

KeyValueStore.prototype.put = function(name, value) {
  this.data[name] = value;
  //console.log("Data:\t" + JSON.stringify(this.data));
};

KeyValueStore.prototype.get = function(name) {
  return this.data[name];
};

KeyValueStore.prototype.delete = function(name) {
  delete this.data[name];
  //console.log("Data:\t" + JSON.stringify(this.data));
};

module.exports = KeyValueStore;
