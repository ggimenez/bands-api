/**
 * DAOs Common functions
 */

/* Load database & database configuration */
const database = require('../../config/dbconfig');

/* Load bluebird Promise */
const Promise = require('bluebird');

/* Load DAO Error entity */
const DaoError = require('./daoError');


findOne = function(sqlRequest, sqlParams){
    
       /* console.log('en daoCommon findOne, sqlRequest: ' + sqlRequest);
        console.log('en daoCommon findOne, sqlParams: ' + sqlParams);*/
    
    return new Promise(function (resolve, reject) {
            let stmt = database.db.prepare(sqlRequest);
            stmt.all(sqlParams, function (err, rows) {
                if (err) {
                    reject(
                        new DaoError(11, "DB Error: " + err)
                    );
                } else if (rows === null || rows.length === 0) {
                    reject(
                        new DaoError(21, "Entity not found")
                    );
                } else {
                    let row = rows[0];
                    resolve(row);
                }
            })
        });
};


findAll = function(sqlRequest) {
        return new Promise(function (resolve, reject) {
            database.db.all(sqlRequest, function (err, rows) {
                if (err) {
                    reject(
                        new DaoError(20, "Internal server error")
                    );
                } else if (rows === null || rows.length === 0) {
                    reject(
                        new DaoError(21, "Entity not found")
                    );
                } else {
                    resolve(rows);
                }
            })
        });
};

countAll = function(sqlRequest) {
        return new Promise(function (resolve, reject) {
            database.db.all(sqlRequest, function (err, countResult) {
                if (err) {
                    reject(
                        new DaoError(20, "Internal server error")
                    );
                } else if (countResult === null || countResult[0].count === 0) {
                    reject(
                        new DaoError(21, "No existen registros")
                    );
                } else {
                    //console.log("en daoCommon.countAll, countResult[0].count: " + countResult[0].count);
                    resolve(countResult[0].count);
                }
            })
        });
};


existsOne = function(sqlRequest, sqlParams) {
        /*
        console.log('en daoCommon existsOne, sqlRequest: ' + sqlRequest);
        console.log('en daoCommon existsOne, sqlParams: ' + JSON.stringify(sqlParams));*/
    
        return new Promise(function (resolve, reject) {
            let stmt = database.db.prepare(sqlRequest);
            stmt.all(sqlParams, sqlParams,function (err, countResult) {
                
                //console.log('en daoCommon, countResult: ' + JSON.stringify(countResult));
                
                if (err) {
                    reject(
                        new DaoError(20, "Internal server error")
                    );
                } else if (countResult && countResult[0].found === 1) {
                    resolve(true);
                } else if(countResult && countResult[0].found === 0) {
                    resolve(false);
                }
            })
        });
};



update = function(sqlRequest, sqlParams){
         
/*        console.log('en daoCommon existsOne, sqlRequest: ' + sqlRequest);
        console.log('en daoCommon existsOne, sqlParams: ' + JSON.stringify(sqlParams));
    */
    
         return new Promise(function (resolve, reject) {
            
            let stmt = database.db.prepare(sqlRequest);
           
            database.db.run(sqlRequest, sqlParams, function(err) {  

                if (this.changes === 1) {
                    resolve(true);
                } else if (this.changes === 0) {
                    reject(
                        new DaoError(21, "Entity not found")
                    )
                } else {
                    console.log(err);
                    reject(
                        new DaoError(11, "Invalid arguments")
                    )
                }
            });
             
             
        });
        
};


insert = function(sqlRequest, sqlParams) {
        return new Promise(function (resolve, reject) {                
            
            let stmt = database.db.prepare(sqlRequest);
        
            stmt.run(sqlParams, function (err) {
                
                if (this.changes === 1) {
                    resolve(true);
                } else {
                    console.log(err);
                    reject(
                        new DaoError(11, "Invalid arguments")
                    )
                }
            })
        });
};



deleteById = function(sqlRequest, sqlParams) {
        return new Promise(function (resolve, reject) {                
            
            let stmt = database.db.prepare(sqlRequest);
        
            stmt.run(sqlParams, function (err) {
                
                if (this.changes === 1) {
                    resolve(true);
                } else {
                    console.log(err);
                    reject(
                        new DaoError(11, "No se pudo borrar registro")
                    )
                }
            })
        });
};



module.exports.findOne = findOne;
module.exports.findAll = findAll;
module.exports.countAll = countAll;
module.exports.existsOne = existsOne;
module.exports.update = update;
module.exports.insert = insert;
module.exports.deleteById = deleteById;