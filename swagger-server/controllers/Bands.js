'use strict';

var url = require('url');

var Bands = require('./BandsService');

module.exports.bandCountGET = function bandCountGET (req, res, next) {
  Bands.bandCountGET(req.swagger.params, res, next);
};

module.exports.bandCreatePOST = function bandCreatePOST (req, res, next) {
  Bands.bandCreatePOST(req.swagger.params, res, next);
};

module.exports.bandDeleteNameDELETE = function bandDeleteNameDELETE (req, res, next) {
  Bands.bandDeleteNameDELETE(req.swagger.params, res, next);
};

module.exports.bandExistsNameGET = function bandExistsNameGET (req, res, next) {
  Bands.bandExistsNameGET(req.swagger.params, res, next);
};

module.exports.bandGET = function bandGET (req, res, next) {
  Bands.bandGET(req.swagger.params, res, next);
};

module.exports.bandNameGET = function bandNameGET (req, res, next) {
  Bands.bandNameGET(req.swagger.params, res, next);
};

module.exports.bandUpdateNamePUT = function bandUpdateNamePUT (req, res, next) {
  Bands.bandUpdateNamePUT(req.swagger.params, res, next);
};
