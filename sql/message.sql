create table master.message (
	messageid SERIAL PRIMARY KEY,
    conversationid INT NOT NULL,
	senderid INT NOT NULL,
    reciverid INT NOT NULL,
    message TEXT NOT NULL,
	isRead BOOLEAN DEFAULT FALSE,
    lastUpdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creationtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    markfordelete_sender BOOLEAN DEFAULT FALSE,
    markfordelete_reciver BOOLEAN DEFAULT FALSE

)