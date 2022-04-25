const Database = require('better-sqlite3')

const logdb = new Database('log.db')

const statement = logdb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='userinfo';`);
let row = statement.get();
if(row === undefined){
    console.log('Log database appears to be empty. Creating log database...')
    const sqlInit = `
        CREATE TABLE accesslog ( remote-addr VARCHAR, remote-user VARCHAR, time VARCHAR, method VARCHAR, url VARCHAR, protocol VARCHAR, http-version NUMERIC, status INTEGER, referer VARCHAR, useragent VARCHAR );
    `;
        logdb.exec(sqlInit)
        console.log('Your database has now been initialized')
}
else{
    console.log('Database already exists')
}

module.exports = logdb
