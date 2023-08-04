const ibmdb = require('ibm_db');

class DB2SP {

    constructor(UserDB, Password, NameDB, HostIP, Port = 50000, maxPoolSize = 10) {
        this.connectionPool = null;
        this.connectionString = `DATABASE=${NameDB};HOSTNAME=${HostIP};UID=${UserDB};PWD=${Password};PORT=${Port};PROTOCOL=TCPIP`;
    }

    connect() {

        const connectionString = this.connectionString;

        if(this.connectionPool) {
            return this.connectionPool;
        }

        this.connectionPool = new Promise((resolve, reject) => {
            ibmdb.open(connectionString, (err, conn) => {
                if (err) {
                    return reject(err);
                }

                resolve(conn);
            });
        });

        return this.connectionPool;
    }

    getConnectionStatus() {
        return new Promise((resolve, reject) => {
            this.connect()
            .then(conn => {
                conn.query('SELECT 1 FROM SYSIBM.SYSDUMMY1', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    async exec(procedureName, params = {}) {
        const sql = `CALL ${procedureName}(${Object.keys(params).map(() => '?').join(', ')})`;

        return new Promise((resolve, reject) => {
            this.connect()
            .then(conn => {
                conn.query(sql, Object.values(params), (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connect()
            .then(conn => {
                conn.close(() => {
                    resolve('DB2 connection closed');
                });
            })
            .catch(err => {
                reject(err);
            });
        });
    }

}

module.exports = DB2SP;