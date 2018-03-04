/* Load Band entity */
const Band = require('../model/band');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Band Data Access Object
 */
class BandDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an Car using its name / Primary Key
     * @params name
     * @return entity
     */
    findById(name) {
        let sqlRequest = "SELECT name, gender, manager, description FROM band WHERE name=$name";
        let sqlParams = {$name: name};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Band(row.name, row.gender, row.manager, row.description));
    };

    /**
     * Finds all bands.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM band";
        return this.common.findAll(sqlRequest).then(rows => {
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
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM band";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given bands in the database
     * @params Band
     * @return true if the band has been updated, false if not found and not updated
     */
    update(band) {
        
        let sqlParams = {
            $name: band.name,
            $gender: band.gender,
            $manager: band.manager,
            $description: band.description
        };
        var sqlRequest = "UPDATE band SET gender=$gender, manager=$manager, description=$description where name=$name";
        
        /*console.log('band: ' + JSON.stringify(band, null, 4)); 
        console.log('antes de llamar a common.run');*/
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given band in the database
     * @params band
     * returns database insertion status
     */
    create(band) {
        let sqlRequest = "INSERT into band (name, gender, manager, description) " +
            "VALUES ($name, $gender, $manager, $description)";
        let sqlParams = {
            $name: band.name,
            $gender: band.gender,
            $manager: band.manager,
            $description: band.description
        };
        return this.common.insert(sqlRequest, sqlParams);
        
        /*let sqlRequest = "INSERT into band (name, gender, manager, description) " +
            "VALUES ($name, $gender, $manager, $description)";
        let sqlParams = {
            $name: band.name,
            $gender: band.gender,
            $manager: band.manager,
            $description: band.description
        };
        
        return  this.common.insert(sqlRequest, sqlParams).then(res => {
            return band;
        });*/
        
    };

   
    /**
     * Deletes an band using its name / Primary Key
     * @params name
     * returns database deletion status
     */
    deleteById(name) {
        let sqlRequest = "DELETE FROM band WHERE name=$name";
        let sqlParams = {$name: name};
        return this.common.delete(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an band exists with the given name / Primary Key
     * @params name
     * returns database band existence status (true/false)
     */
    exists(name) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM band WHERE name=$name";
        let sqlParams = {$name: name};
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}

module.exports = BandDao;