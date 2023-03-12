const assert = require('assert');
const sqlite = require('sqlite-async');

class ContactDB {
    constructor() {
        // Read Configuration/DB
        this.path = process.env.DBPATH;
        assert(this.path !== undefined, "DBPATH not specified in environment.");
    }

    async connect() {
        this.db = await sqlite.open(this.path);
    }

}

module.exports = ContactDB;