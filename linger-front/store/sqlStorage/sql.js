export const user_table_name = "user";



export const sql = {
    user: {
        select_data:`select * from ${user_table_name}`,
        create_user_table:`
        CREATE TABLE IF NOT EXISTS ${user_table_name} (
        userid INTEGER,
        username TEXT  UNIQUE,
        name TEXT ,
        email TEXT  UNIQUE,
        bio TEXT DEFAULT '',
        password TEXT ,
        gender TEXT ,
        country TEXT ,
        profileimage TEXT ,
        platformlangauge TEXT ,
        learnlangauge TEXT ,
        followerscount INTEGER ,
        followingcount INTEGER ,
        answerscount INTEGER,
        questioncount INTEGER ,
        isverified BOOLEAN ,
        token TEXT,
        creationtime DATETIME 
    )`,
        drop_user_table: `DROP TABLE IF EXISTS ${user_table_name}`,
        insert_into_table: `
        INSERT INTO ${user_table_name} (userid, username, name, email, bio, password, gender, country, profileimage, 
            followerscount, followingcount, answerscount, questioncount, creationtime, 
            isverified, role, markfordelete) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    },
    get_the_user: `INSERT INTO name,username,email,token ${user_table_name}`


}