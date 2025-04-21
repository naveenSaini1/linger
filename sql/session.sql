create table master.session (
	sessoinid SERIAL PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	session  VARCHAR(100) NOT NULL,
	creationtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    markfordelete INT DEFAULT 0	
)