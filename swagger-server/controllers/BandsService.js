'use strict';

exports.bandCountGET = function(args, res, next) {
  /**
   * Count the number of bands
   * Count the number of bands 
   *
   * returns BigDecimal
   **/
  var examples = {};
  examples['application/json'] = 0.80082819046101150206595775671303272247314453125;
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.bandCreatePOST = function(args, res, next) {
  /**
   * Create a new a Band
   * Create a Band
   *
   * band Band_1 fields to update of the band.
   * no response value expected for this operation
   **/
  res.end();
}

exports.bandDeleteNameDELETE = function(args, res, next) {
  /**
   * Delete a Band
   * Delete a Band
   *
   * name String Name of the band, PK.
   * no response value expected for this operation
   **/
  res.end();
}

exports.bandExistsNameGET = function(args, res, next) {
  /**
   * Validate the existence or not of a band
   * Validate the existence or not of a band.
   *
   * name String Name of the band, PK.
   * returns Boolean
   **/
  var examples = {};
  examples['application/json'] = true;
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.bandGET = function(args, res, next) {
  /**
   * Get all bands
   * Get all bands. 
   *
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "gender" : "aeiou",
  "manager" : "aeiou",
  "name" : "aeiou",
  "description" : "aeiou"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.bandNameGET = function(args, res, next) {
  /**
   * Get one band.
   * Get one band. 
   *
   * name String Name of the band, PK.
   * returns Band
   **/
  var examples = {};
  examples['application/json'] = {
  "gender" : "aeiou",
  "manager" : "aeiou",
  "name" : "aeiou",
  "description" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.bandUpdateNamePUT = function(args, res, next) {
  /**
   * Update a Band
   * Update a Band
   *
   * name String Name of the band, PK.
   * band Band fields to update of the band.
   * no response value expected for this operation
   **/
  res.end();
}

