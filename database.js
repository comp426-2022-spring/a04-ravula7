const database = require('better-sqlite3')

const logdb = new database('log.db')

const statement = logdb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and 'access';`)
let row = statement.get();
if(row === undefined){
    console.log('Log database appears to be empty. Creating log database...')
    const sqlInit = `
        CREATE TABLE accesslog ( 
            remote-addr VARCHAR, 
            remote-user VARCHAR, 
            time VARCHAR,
            method VARCHAR, 
            url VARCHAR, 
            protocol VARCHAR,
            http_version NUMERIC, 
            status INTEGER, 
            content-length NUMERIC,
            referer VARCHAR,
            user_agent VARCHAR
            );
    `
#id INTEGER PRIMARY KEY, date VARCHAR, referrer_url VARCHAR,
        logdb.exec(sqlInit)
}
else{
    console.log('Your database has been initialized')
}

module.exports = logdb
