"use strict";
const Database = require('better-sqlite3')

const logdb = new Database('log.db')

const statement = logdb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`);
let row = statement.get();
if(row === undefined){
    console.log('Initializing database')
    const sqlInit = `
        CREATE TABLE accesslog ( remoteaddr VARCHAR, remoteuser VARCHAR, time VARCHAR, method VARCHAR, url VARCHAR, protocol VARCHAR, httpversion NUMERIC, status INTEGER, referer VARCHAR, useragent VARCHAR );
    `;
        logdb.exec(sqlInit)
        console.log('Your database has now been initialized')
}
else{
    console.log('Database already exists')
}

module.exports = logdb
