-- seeds/02_rooms.sql

INSERT INTO rooms (name, user_1_id, user_2_id, user_3_id, session_number, session_goal) VALUES ('Regex', 1, 2, 3, 3, 20);
INSERT INTO rooms (name, user_1_id, user_2_id, user_3_id, user_4_id, session_number, session_goal) VALUES ('Origami', 1, 3, 2, 4, 0, 10);
INSERT INTO rooms (name, user_1_id, user_2_id, user_3_id, user_4_id, session_number, session_goal) VALUES ('Potato Sculpting', 2, 5, 6, 7, 6, 12);
INSERT INTO rooms (name, user_1_id, user_2_id, session_number, session_goal) VALUES ('Salsa-Making', 2, 4, 2, 2);
INSERT INTO rooms (name, user_1_id, session_number, session_goal) VALUES ('Ruby on Rails', 2, 0, 1);