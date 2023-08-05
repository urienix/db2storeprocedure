[![NPM](https://nodei.co/npm/db2storeprocedure.png)](https://www.npmjs.com/package/db2storeprocedure)

# DB2STOREPROCEDURE

A fast and easy way to execute IBM DB2 stored procedures using promises, inspired by the [sqlstoreprocedure](https://www.npmjs.com/package/sqlstoreprocedure) package by Juan Mora and Agustin Gonzalez. It's a great package that does the same thing as this one, but for SQL Server.


### Installation

```bash
npm install db2storeprocedure
```

or

```bash
yarn add db2storeprocedure
```

### Usage

```javascript
const DB2SP = require('db2storeprocedure');
const pool = new DB2SP('userdb', 'password', 'databasename', 'IP'); 

// If you want to use a different port, you can specify it as the fifth parameter
// If you want to use a diferent maxPoolSize, you can specify it as the sixth parameter

const parameters = {
    /* 
        The parameters that you want to pass to the stored procedure.
        the name of the parameter is not important, but the order is.
        PLEASE KEEP THE ORDER OF THE PARAMETERS THE SAME AS THE STORED PROCEDURE
    */
    param1: 'value1',
    param2: 'value2'
};

pool.exec('MYSTOREDPROCEDURE', parameters)
    .then(result => {
        // Do something with the result
        console.log(result);
    })
    .catch(err => {
        // Handle the error
        console.log(err);
    });


// If you have Schema, you can pass it with procedure name
pool.exec('SCHEMANAME.MYSTOREDPROCEDURE', parameters)
    .then(result => {
        // Do something with the result
        console.log(result);
    })
    .catch(err => {
        // Handle the error
        console.log(err);
    });
```

> **Note:** The parameters are optional, if you don't need to pass any parameters, you can just call the function without the second parameter.

#### Usage with async/await

```javascript
const DB2SP = require('db2storeprocedure');
const pool = new DB2SP('userdb', 'password', 'databasename', 'IP'); 

async function myFunction() {
    try {
        const result = await pool.exec('MYSTOREDPROCEDURE');
        // Do something with the result
        console.log(result);
    } catch (err) {
        // Handle the error
        console.log(err);
    }
}
```

#### AUTOR NOTES

This package was created for personal use, but I decided to publish it in case someone else needs it. Please keep in mind that I am learning IBM DB2 and NodeJS packages, so this package may not be the best way to do it. If you have any suggestions, please let me know.


Made with ❤️ by [urienix](https://urienix.moe)