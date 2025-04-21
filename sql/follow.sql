CREATE TABLE master.follow (
    followid SERIAL PRIMARY KEY,
    follower_id INTEGER NOT NULL,
    following_id INTEGER NOT NULL,
    creationtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(10) CHECK (status IN ('active', 'blocked', 'removed')) DEFAULT 'active',
    markfordelete INT DEFAULT 0,
    CONSTRAINT unique_follow UNIQUE (follower_id, following_id)
);
