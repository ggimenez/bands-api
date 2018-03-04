/**
 * Controllers Common functions
 */
class controllerCommon {

    findSuccess(res) {
        return (result) => {
            res.status(200); // Found
            res.json(result);
        }
    }

    existsSuccess(res) {
        return (result) => {
            res.status(200); // Found
            res.json(result);
        }
    }

    createSuccess(res) {
        
        /* res.status(201); // Created
            //res.json(result);
         res.location('/customers/' + 4);*/
         return res;
        console.log('en createSuccess... :');
        return () => {
            res.status(201); // Created
            //res.json(result);
            res.location('/customers/' + 4);
        }
    }
    
    deleteSuccess(res) {
        
        return () => {
            console.log('en return deleteSuccess...');
            res.status(204); // A successful DELETE, with no further information. 204 No Content
        }
    }
    
    
    
    editSuccess(res) {
        return () => {
            res.status(200); // Created/Updated/Deleted
            res.json({});
        }
    }

    serverError(res) {
        return (error) => {
            res.status(500);
            res.json(error);
        }
    }

    findError(res) {
        return (error) => {
            res.status(404); // Not found
            res.json(error);
        }
    }
}

module.exports = controllerCommon;