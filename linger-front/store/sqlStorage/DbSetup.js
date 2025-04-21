import * as SQLite from 'expo-sqlite';
export const getDbConnection = async () => {
    console.log("opening database");
    return new Promise((resolve, reject) => {
        SQLite.openDatabaseAsync('linger.db')
            .then((data) => {
                resolve(data);
                console.log("database created sucesfully");
            })
            .catch((error) => {
                reject(error);
            })
    })
};





