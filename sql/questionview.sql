	create table master.questionview(
		questionviewid BIGSERIAL PRIMARY KEY,
		entityid  INTEGER NOT NULL,
		userid INTEGER NOT NULL,
		type varchar(200) NOT NULL CHECK (type IN ('question', 'answer')),
		markfordelete INT DEFAULT 0	,
		creationtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)