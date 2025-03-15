create table master.code (
	codeid serial primary key,
	userid Integer,
	code varchar(100),
	creationtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	markfordelete INT DEFAULT 0	

)