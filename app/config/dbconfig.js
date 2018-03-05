/* Load modules */
let sqlite3 = require('sqlite3').verbose();

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database('./sqlite.db');

/* Init band table if they don't exist */
let init = function () {
    db.run("CREATE TABLE if not exists band (" +
        "name TEXT PRIMARY KEY," +
        "gender TEXT," +
        "manager TEXT," +
        "description TEXT" +    
        ")", function(err) {  

                db.run("INSERT OR IGNORE into band (name, gender, manager, description) " +
            "VALUES ('Metallica', 'thrash', 'Peter Mensch', 'Metallica is an American heavy metal band from Los Angeles...')");
    
                db.run("INSERT OR IGNORE into band (name, gender, manager, description) " +
            "VALUES ('Oasis', 'britpop', 'Alan McGee', 'Oasis were an English rock band formed in Manchester in 1991. ')");
        
               
            });
    
    
    
};




module.exports = {
    init: init,
    db: db
};

