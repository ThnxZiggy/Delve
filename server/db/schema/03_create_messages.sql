-- schema/01_create_users.sql
DROP TABLE IF EXISTS messages CASCADE;
-- CREATE USERS
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  room_id integer REFERENCES rooms(id) ON DELETE CASCADE,
  user_id integer REFERENCES users(id) ON DELETE CASCADE,
  content VARCHAR(255) NOT NULL,
  time TIMESTAMP NOT NULL DEFAULT current_timestamp
);