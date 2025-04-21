	create table master.questionhashtag(
		questionid INTEGER NOT NULL,
		hashtagid INTEGER NOT NULL,
		markfordelete INT DEFAULT 0	,
		creationtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)