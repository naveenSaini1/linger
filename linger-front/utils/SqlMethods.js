import { user_table_name } from "../store/sqlStorage/sql";

export const genrateQueryForUserInsert = (object) => {

    let keys = Object.keys(object);
    let values = Object.values(object).map(value => {
        if (typeof value === "string") {
            return `'${value.replace(/'/g, "''")}'`; // Escape single quotes in strings
        } else if (value === null) {
            return "NULL";
        }
        return value;
    });
    let query = `INSERT INTO ${user_table_name} (${keys.join(', ')}) VALUES (${values});`;
    return query;
}

export const genrateTableQueryForUser = (object) => {
    let query = `CREATE TABLE IF NOT EXISTS ${user_table_name} (`;
    const columns = Object.keys(object).map(key => {
        // Determine SQLite data type dynamically
        let dataType = 'TEXT'; // Default type

        if (typeof object[key] === 'number') {
            dataType = 'INTEGER';
        } else if (typeof object[key] === 'boolean') {
            dataType = 'BOOLEAN';
        }

        return `${key} ${dataType}`;
    }).join(', ');
    return query += columns + ")";
}