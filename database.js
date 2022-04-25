const Database = require('better-sqlite3')

const logdb = new Database('log.db')

const statement = logdb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='userinfo';`);
let row = statement.get();
if(row === undefined){
    console.log('Log database appears to be empty. Creating log database...')
    const sqlInit = `
        CREATE TABLE accesslog ( remoteaddr VARCHAR, remoteuser VARCHAR, time VARCHAR, method VARCHAR, url VARCHAR, protocol VARCHAR, httpversion NUMERIC, status INTEGER, referer VARCHAR, useragent VARCHAR );
        INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, status, referer, useragent) VALUES ('req.ip', 'req.user', Date.now(), 'req.method', 'req.url', 'req.protocol', 'req.httpVersion', 'res.statusCode', 'req.headers['referer'], 'req.headers['user-agent'])
    `;
        logdb.exec(sqlInit)
        console.log('Your database has now been initialized')
}
else{
    console.log('Database already exists')
}

module.exports = logdb
