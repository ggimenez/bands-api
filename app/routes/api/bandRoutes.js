/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const bandController = require('../../controller/bandController');
//const bandController = new BandController();


const Band = require('../../model/band');

responseOK = function(result, res) {
    res.status(200); // Found
    res.json(result);
    res.send();
    return res;
};

responseDeleteSuccessful = function(result, res) {
    res.status(204).send();
};


responseCreater = function(result, res) {
    res.status(200); // Found
    res.json(result);
    return res;
};

responseInternalError = function(error, res) {
    res.status(500);
    res.json(error);
    return res;
};

responseNotFoundError = function(error, res) {
    res.sendStatus(404);
    return res;
}



/**
 * Band Entity routes
 */
router.get('/count', function (req, res) {
    
    bandController.countAll()
        .then(
            (result) => {
                responseOK(result, res);
            }
        )
        .catch(
            (error) => {
                responseInternalError(error, res);   
            }
        );
    
});

router.get('/exists/:name', function (req, res) {
     
    let name = req.params.name;   
    bandController.exists(name)
        .then(
            (result) => {
                responseOK(result, res);
            }
        )
        .catch(
            (error) => {
                responseInternalError(error, res);  
        }
    );
    
});

router.get('/:name', function (req, res) {
    let name = req.params.name;  
    bandController.findById(name)
    .then(
        (result) => {
            responseOK(result, res);
        }
    )
    .catch(
        (error) => {
            if(error.errorCode === 21){
                responseNotFoundError(error, res); 
            }else{
                responseInternalError(error, res);     
            }
        }
    );
});

router.get('/', function (req, res) {
    bandController.findAll()
        .then(
            (result) => {
               responseOK(result, res);
            }
        )
        .catch(
            (error) => {
                if(error.errorCode === 21){
                    responseNotFoundError(error, res); 
                }else{
                    responseInternalError(error, res);     
                }
            }
        );
});

router.put('/:name', function (req, res) {

    let band = new Band();
    band.name = req.params.name;
    band.gender = req.body.gender;
    band.manager = req.body.manager;
    band.description = req.body.description;
    
    bandController.update(band)
        .then(
            (result) => {
                responseOK(band, res);
            }
        )
        .catch(
            (error) => {
                if(error.errorCode === 21){
                    responseNotFoundError(error, res); 
                }else{
                    responseInternalError(error, res);     
                }
            }
        );
});

router.post('/', function (req, res) {
        
    let band = new Band();
    band.name = req.body.name;
    band.gender = req.body.gender;
    band.manager = req.body.manager;
    band.description = req.body.description;
    
    bandController.create(band)
        .then(
            (result) => {
               responseOK(band, res);
            }
        )
        .catch(
            (error) => {
                responseInternalError(error, res); 
            }
        );
});

router.delete('/:name', function (req, res) {
    let name = req.params.name;
    bandController.deleteById(name)
        .then(
            (result) => {
               responseDeleteSuccessful(result, res);
            }
        )
        .catch(
            (error) => {
                if(error.errorCode === 21){
                    responseNotFoundError(error, res); 
                }else{
                    responseInternalError(error, res);     
                }
            }
        );
});

module.exports = router;