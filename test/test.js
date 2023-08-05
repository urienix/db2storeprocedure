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

// checking procedure without input parameters
function showAccountsWithPromise(){
    pool.exec('MYSCHEMA.GETACCOUNTS')
    .then(accounts => {
        console.log(accounts);
    })
    .catch(err => {
        console.log(err);
    });
}

// checking input parameters
function showAccountsByIdWithPromise(){
    pool.exec('TRANSMON.GETACCOUNTBYID', { AccID: 1 , userName: 'user1s'})
    .then(accounts => {
        console.log(accounts);
    })
    .catch(err => {
        console.log(err);
    });
}

// checking error return
function generateError(){
    pool.exec('TRANSMON.GENERATEERROR')
    .then(accounts => {
        console.log(accounts);
    })
    .catch(err => {
        console.log(err);
    });
}

// showAccountsWithPromise();
// showAccountsWithAsyncAwait();
// generateError();

pool.close();