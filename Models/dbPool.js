import mysql from 'mysql';
import { setFlagsFromString } from 'v8';

/**
 * This file exports the object 'dbPool'
 * dbPool is initialized pool of connections to the database
 * This file also exports a function 'initializeDatabasePool'
 * The init functoin must be called in entry to application
 */


export let dbPool;

export const initializeDatabasePool = databaseCredentials => {
    dbPool = createDatabasePool(databaseCredentials);
}


/**
 * This factory function returns a wrapper to a database pool
 * Similar to a class, but it is a function that returns an objects
 * Allows for asynchronous bindings
 */
function createDatabasePool(databaseCredentials) {
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