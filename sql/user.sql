create table master.user (
	userid SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    bio TEXT DEFAULT '',
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')) DEFAULT 'Male' ,
    country VARCHAR(100) DEFAULT 'India',
    profileimage VARCHAR(255) DEFAULT 'default.jpg',
    followerscount INT DEFAULT 0,
    followingcount INT DEFAULT 0,
    answerscount INT DEFAULT 0,
    questioncount INT DEFAULT 0,
    creationtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(10) CHECK (role IN ('ROLE_USER', 'ROLE_ADMIN')) DEFAULT 'ROLE_USER',
    markfordelete INT DEFAULT 0	
)
