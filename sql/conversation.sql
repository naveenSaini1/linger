create table master.conversation (
		conversationid serial primary key,
		senderid Integer Not Null,
		reciverid Integer Not Null,
		type VARCHAR(10) CHECK (type IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
		creationtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		markfordelete INT DEFAULT 0	
)