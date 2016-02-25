/**
 * Module dependencies
 */

var path = require('path');
var _ = require('lodash');
var fsx = require('fs-extra');
var r_buildCSVParserReceiverStream = require('./standalone/build-csv-parser-receiver-stream');



/**
 * skipper-csv
 *
 * @type {Function}
 * @param  {Object} options
 * @return {Object}
 */

module.exports = function SkipperCSVStream(options) {
  options = options || {};

  var log = options.log || function _noOpLog() {};

  var adapter = {};
  adapter.rm = function(fd, cb) {
    return cb();
  };

  adapter.ls = function(dirpath, cb) {
    return cb(null, []);
  };

  adapter.read = function(fd, cb) {
    return null;
  };

  adapter.receive = function(options) {
    return r_buildCSVParserReceiverStream(options, adapter);
  };

  return adapter;
};




