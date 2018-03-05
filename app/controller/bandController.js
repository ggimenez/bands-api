/**
 * Band Controller
 */

/* Load Band Data Access Object */
const bandDao = require('../dao/bandDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Band entity */
const Band = require('../model/band');

const CircularJSON = require('circular-json');


/**
 * Tries to find an band using its name / Primary Key
 * @params req, res
 * @return band
 */
findById = function(name) {
   
    return bandDao.findById(name);            
};


/**
 * Finds all bands.
 * @return all bands
 */
findAll = function() {
        
        return bandDao.findAll();
};


/**
 * Counts all the bands present in the database
 * @return count
 */
countAll = function() {

    return bandDao.countAll();
           
};

/**
* Returns true if an band exists with the given name / Primary Key
* @params req, res
* @return
*/
exists = function(name) {
    return bandDao.exists(name);
};

/**
 * Updates the given band in the database
 * @params req, res
 * @return true if the band has been updated, false if not found and not updated
 */
update = function(band) {
    
    return bandDao.update(band);
        
};

/**
* Creates the given band in the database
* @params req, res
* returns database insertion status
*/
create = function(band) {
    
   return bandDao.create(band);

};

/**
 * Deletes an band using its Id / Primary Key
 * @params req, res
 * returns database deletion status
 */
deleteById = function(name) {
                
    return bandDao.deleteById(name);
};




module.exports.findById = findById; 
module.exports.findAll = findAll;
module.exports.countAll = countAll;
module.exports.exists = exists;
module.exports.update = update;
module.exports.create = create;
module.exports.deleteById = deleteById;