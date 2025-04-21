export const createUserTableIfExist = async (query, db) => {

    if (!db || !query) return;

    console.log("createing table")
    return new Promise((resolve, reject) => {
        db.runAsync(query)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                console.log(error, "create table error")
                reject(error);
            })
    })

}
export const dropTable = async (query, db) => {
    try {
        console.log("drop table is comming")
        let result = await db.runAsync(query)
        console.log(result.lastInsertRowId, "ressllllt");

    } catch (error) {
        console.warn(error, "error in drop table")

    }
}
export const inserUser = async (db, query) => {
    // console.log(params,query)
    console.log("going for insert", query)
    try {
        let result = await db.runAsync(query);
        console.log(result.lastInsertRowId, "inserted row")
        return result.lastInsertRowId;


    }
    catch (error) {
        console.log(error, "somethign went wrong")

    }

}

export const getTheDataIfExist = async (db, query) => {
    try {
        let item = [];
        const allRows = await db.getAllAsync(query);
        for (const row of allRows) {

           return row;
        }

    } catch (error) {
        console.log(error, "getTheDataExists")

    }
}
