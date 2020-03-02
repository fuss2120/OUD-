import mysql from 'mysql';

export default class DBConnection {
    constructor(databaseCredentials) {
        this.connection = mysql.createConnection(databaseCredentials);
        this.connection.connect(error => {
            if (error) throw error;
        })
    }
}