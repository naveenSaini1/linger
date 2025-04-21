	create table master.hashtag(
		hashtagid SERIAL PRIMARY KEY,
		userid INTEGER NOT NULL,
		name TEXT UNIQUE NOT NULL,
		usagecount INTEGER DEFAULT 0,
		markfordelete INT DEFAULT 0	,
		creationtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)