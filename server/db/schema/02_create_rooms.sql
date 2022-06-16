-- schema/02_create_urls.sql
DROP TABLE IF EXISTS rooms CASCADE;
-- CREATE URLS
CREATE TABLE rooms (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  user_1_id integer REFERENCES users(id) ON DELETE CASCADE,
  user_2_id integer REFERENCES users(id) ON DELETE CASCADE,
  user_3_id integer REFERENCES users(id) ON DELETE CASCADE,
  user_4_id integer REFERENCES users(id) ON DELETE CASCADE,
  session_number integer DEFAULT 0,
  session_goal integer DEFAULT 10,
  date_time VARCHAR(255),
  url VARCHAR(255)
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO labber;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO labber;