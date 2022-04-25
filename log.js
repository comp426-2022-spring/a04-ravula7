"use strict";
const Database = require('better-sqlite3')

const logdb = new Database('log.db')

const statement = logdb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`);
let row = statement.get();
if(row === undefined){
    console.log('Initializing database')
    const sqlInit = `
        CREATE TABLE accesslog ( id INTEGER PRIMARY KEY, remote_addr VARCHAR, remote_user VARCHAR, time VARCHAR, method VARCHAR, url VARCHAR, protocol VARCHAR, http_version NUMERIC, status INTEGER, referer VARCHAR, user_agent VARCHAR );
    `;
        logdb.exec(sqlInit)
        console.log('Your database has now been initialized')
}
else{
    console.log('Database already exists')
}

module.exports = logdb
