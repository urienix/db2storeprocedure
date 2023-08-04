const DB2SP = require('../lib/index.js');

/*
    THIS IS A TEST ON DOCKER CONTAINER DB2 
    SHOW MORE IN https://hub.docker.com/r/ibmcom/db2
*/

const pool = new DB2SP('db2inst1', 'Inst423w', 'MYDB', '172.17.0.2');

async function showAccountsWithAsyncAwait(){
    let accounts = await pool.exec('MYSCHEMA.GETACCOUNTS');
    console.log(accounts);
}

function showAccountsWithPromise(){
    pool.exec('MYSCHEMA.GETACCOUNTS')
    .then(accounts => {
        console.log(accounts);
    })
    .catch(err => {
        console.log(err);
    });
}

//showAccountsWithPromise();
//showAccountsWithAsyncAwait();
pool.close();