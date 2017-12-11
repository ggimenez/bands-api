/**
 * Driver Entity (ES6 Class)
 */

class Band {
    constructor(name, gender, manager, description) {
        this.name = name;
        this.gender = gender;
        this.manager = manager;
        this.description = description;
    }
}

module.exports = Band;