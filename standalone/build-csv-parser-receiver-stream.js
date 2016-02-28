/**
 * Module dependencies
 */

var WritableStream = require('stream').Writable;
var path = require('path');
var _ = require('lodash');
var fsx = require('fs-extra');
var debug = require('debug')('skipper-csv');
var util = require('util');


/**
 * A simple receiver for Skipper that writes Upstreams to
 * a CSV parser
 *
 * Includes a garbage-collection mechanism for failed
 * uploads.
 *
 * @param  {Object} options
 * @return {Stream.Writable}
 */
module.exports = function buildCSVParserReceiverStream(options, adapter) {
  options = options || {};
  var log = options.log || function noOpLog(){};

  _.defaults(options, {
    rowHandler: function(){
      log("Empty rowHandler, please override!")
    }
  });

  var receiver__ = WritableStream({ objectMode: true });

  receiver__._files = [];

  // This `_write` method is invoked each time a new file is received
  // from the Readable stream (Upstream) which is pumping filestreams
  // into this receiver.  (filename === `__newFile.filename`).
  receiver__._write = function onFile(__newFile, encoding, done) {

    // Error reading from the file stream
    debug('binding error handler for incoming file in skipper-csv');
    __newFile.on('error', function(err) {
      debug('Read error on file '+__newFile.filename+ '::'+ util.inspect(err&&err.stack));
      log('***** READ error on file ' + __newFile.filename, '::', err);
    });

    // Create a new write stream to parse CSV stream
    var outs__ = require('csv-parse')(options.csvOptions);

    // When the file is done writing, call the callback
    outs__.on('finish', function successfullyWroteFile() {
      log('finished CSV parser');
      done();
    });
    outs__.on('error', function(err) {
      debug('Write error on CSV parser ' + util.inspect(err&&err.stack));
      log('***** WRITE error on CSV parser ', err);
      done(err)
    });
    outs__.on('readable', function() {
      while(record = outs__.read()){
        options.rowHandler(record, __newFile.fd, __newFile);
      }
    })

    // Finally pipe out to CSV parser
    __newFile.pipe(outs__);

  };

  return receiver__;
};
