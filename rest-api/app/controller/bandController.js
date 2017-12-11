/* Load Band Data Access Object */
const BandDao = require('../dao/bandDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Band entity */
const Band = require('../model/band');

/**
 * Band Controller
 */
class BandController {

    constructor() {
        this.bandDao = new BandDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an band using its name / Primary Key
     * @params req, res
     * @return band
     */
    findById(req, res) {
        let name = req.params.name;

        this.bandDao.findById(name)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all bands.
     * @return all bands
     */
    findAll(res) {
        this.bandDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the bands present in the database
     * @return count
     */
    countAll(res) {

        this.bandDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given band in the database
     * @params req, res
     * @return true if the band has been updated, false if not found and not updated
     */
    update(req, res) {
        let band = new Band();
        band.name = req.params.name;
        band.gender = req.body.gender;
        band.manager = req.body.manager;
        band.description = req.body.description;
     
        return this.bandDao.update(band)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    
    
    /**
     * Creates the given band in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let band = new Band();
       
        band.name = req.body.name;
        band.gender = req.body.gender;
        band.manager = req.body.manager;
        band.description = req.body.description;
      
        return this.bandDao.create(band)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));

    };
    
    
    /**
     * Deletes an band using its Id / Primary Key
     * @params req, res
     * returns database deletion status
     */
    deleteById(req, res) {
        let name = req.params.name;

        this.bandDao.deleteById(name)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Returns true if an band exists with the given name / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let name = req.params.name;

        this.bandDao.exists(name)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = BandController;