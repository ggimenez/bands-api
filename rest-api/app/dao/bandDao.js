/**
 * Band Data Access Object
 */

/* Load Band entity */
const Band = require('../model/band');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');


/**
* Tries to find an Car using its name / Primary Key
* @params name
* @return entity
*/
findById = function(name){
    /*console.log('en bandDao findById, name: ' + name);*/
    let sqlRequest = "SELECT name, gender, manager, description FROM band WHERE name=$name";
    let sqlParams = {$name: name};
    return daoCommon.findOne(sqlRequest, sqlParams)
            .then(row =>
                new Band(row.name, row.gender, row.manager, row.description)
            );
    
};


/**
 * Finds all bands.
 * @return all entities
 */
findAll = function() {
        let sqlRequest = "SELECT * FROM band";
        return daoCommon.findAll(sqlRequest).then(rows => {
            let bands = [];
            for (const row of rows) {
              /*  console.log('row: ' + '[' + row.name + '-' + row.gender + ']')
                console.log('antes de hace push...');*/
                bands.push(new Band(row.name, row.gender, row.manager, row.description));
                /*console.log('bands :');*/
            }
            
            return bands;
        });
};

/**
* Counts all the bands present in the database
* @return count
*/
countAll = function() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM band";
        return daoCommon.countAll(sqlRequest);
};



/**
* Returns true if an band exists with the given name / Primary Key
* @params name
* returns database band existence status (true/false)
*/
exists = function(name) {
        let sqlRequest = "SELECT count(*) as found FROM band WHERE name=$name";
        let sqlParams = {$name: name};
        return daoCommon.existsOne(sqlRequest, sqlParams);
};

/**
 * Updates the given bands in the database
 * @params Band
 * @return true if the band has been updated, false if not found and not updated
 */
update = function(band) {
        
        let sqlParams = {
            $name: band.name,
            $gender: band.gender,
            $manager: band.manager,
            $description: band.description
        };
        var sqlRequest = "UPDATE band SET gender=$gender, manager=$manager, description=$description where name=$name";
        
        /*console.log('band: ' + JSON.stringify(band, null, 4)); 
        console.log('antes de llamar a common.run');*/
        return daoCommon.update(sqlRequest, sqlParams);
};


/**
* Creates the given band in the database
* @params band
* returns database insertion status
*/
create = function(band) {
        let sqlRequest = "INSERT into band (name, gender, manager, description) " +
            "VALUES ($name, $gender, $manager, $description)";
        let sqlParams = {
            $name: band.name,
            $gender: band.gender,
            $manager: band.manager,
            $description: band.description
        };
        return daoCommon.insert(sqlRequest, sqlParams);
        
};

/**
 * Deletes an band using its name / Primary Key
 * @params name
 * returns database deletion status
 */
deleteById = function(name) {
        let sqlRequest = "DELETE FROM band WHERE name=$name";
        let sqlParams = {$name: name};
        return daoCommon.deleteById(sqlRequest, sqlParams);
};

module.exports.findById = findById;
module.exports.findAll = findAll;
module.exports.countAll = countAll;
module.exports.exists = exists;
module.exports.update = update;
module.exports.create = create;
module.exports.deleteById = deleteById;
