	create table master.question(
		questionid SERIAL PRIMARY KEY,
		userid INTEGER NOT NULL,
		title TEXT NOT NULL,
		body TEXT NOT NULL,
		viewscount INTEGER DEFAULT 0,
		likescount INTEGER DEFAULT 0,
		answerscount INTEGER DEFAULT 0,
		commentscount INTEGER DEFAULT 0,
		markfordelete INT DEFAULT 0	,
		creationtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updationtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)