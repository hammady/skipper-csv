# [<img title="skipper-csv - CSV Parser adapter for Skipper" src="http://i.imgur.com/P6gptnI.png" width="200px" alt="skipper emblem - face of a ship's captain"/>](https://github.com/hammady/skipper-disk) CSV Parser Adapter 

[![NPM version](https://badge.fury.io/js/skipper-csv.png)](http://badge.fury.io/js/skipper-csv) &nbsp; &nbsp;
[![Build Status](https://travis-ci.org/hammady/skipper-csv.svg?branch=master)](https://travis-ci.org/hammady/skipper-csv)

CSV Parser adapter for receiving [upstreams](https://github.com/balderdashy/skipper#what-are-upstreams). Particularly useful for streaming multipart file uploads from the [Skipper](github.com/balderdashy/skipper) body parser.
By using this adapter, you can CSV parse the uploaded files in-flight, as soon as first chunks are ready.
You don't have to wait until the upload is finished to start parsing.
You simply configure the adapter by giving it the CSV parse options
(typically those found in [csv-parse module](https://www.npmjs.com/package/csv-parse)).
You also pass `rowHandler` function in the options that will be called for every parsed row.
See example usage below.

## Acknowledgement
This module is an adaptation of [skipper-disk](http://www.github.com/balderdashy/skipper-disk) module. Much of the code is borrowed from there.

## Installation

```
$ npm install skipper-csv --save
```

If you're using this module with Express, Connect, Kraken, or a vanilla Node.js server, make sure you have skipper itself [installed as your body parser](http://beta.sailsjs.org/#/documentation/concepts/Middleware?q=adding-or-overriding-http-middleware).  This is the default configuration in [Sails](https://github.com/balderdashy/sails) as of v0.10.



## Usage

### Basic example

```
    req.file('files').upload({
      adapter: require('skipper-csv'),
      csvOptions: {delimiter: ',', columns: true},
      rowHandler: function(row, fd){
        console.log(fd, row);
      }
    }, function (err, files) {
      if (err)
        return res.serverError(err);

      return res.json({
        message: "Uploaded " + files.length + " CSV files!",
        files: files
      });

    });

```

## Testing

To run the tests:

```shell
$ npm test
```


## License

**[MIT](./LICENSE)**
&copy; 2016

[Hossam Hammady](http://twitter.com/hammady)

[Data Analytics](http://da.qcri.org) group

[Qatar Computing Research Institute](http://qcri.qa)

member of [Qatar Foundation](http://qcri.qa)

See `LICENSE.md`.

This module is part of the [Sails framework](http://sailsjs.org), and is free and open-source under the [MIT License](http://sails.mit-license.org/).


![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png)
