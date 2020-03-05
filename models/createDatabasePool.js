import mysql from 'mysql';


/**
 * This factory function returns a wrapper to a database pool
 * Similar to a class, but it is a function that returns an objects
 * Allows for asynchronous bindings
 */


export default function createDatabasePool(databaseCredentials) {
    const pool = mysql.createPool(databaseCredentials);

    const query = sql => {
        return new Promise((resolve, reject) => {
            pool.query(sql, (error, results) => {
                if (error) reject(error);
                resolve(results)
            })
        })
    }

    const getTables = async () => {
        return await query("SHOW TABLES");
    }

    return { query, getTables }
}