	create table master.answer(
		answerid SERIAL PRIMARY KEY,
		questionid INTEGER NOT NULL,
		userid INTEGER NOT NULL,	
		body TEXT NOT NULL,
		isaccepated BOOLEAN DEFAULT FALSE,
		viewscount INTEGER DEFAULT 0,
		likescount INTEGER DEFAULT 0,
		commentscount INTEGER DEFAULT 0,
		markfordelete INT DEFAULT 0	,
		creationtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updationtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)