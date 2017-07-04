BEGIN;

INSERT INTO users (email, password, name) VALUES
('yockey.alerts@gmail.com', 'Password1', 'Demo One'),
('lindayockey@yahoo.com', 'Password2', 'Demo Two');

INSERT INTO friends (user_id, friend_id, status) VALUES
(2, 1, 'pending');

INSERT INTO hospitalizations (user_id, patient, condition, conscious, latest_update) VALUES
(1, 'Grandpa Joe', 'heart attack', true, 'Waiting to meet with doctor for results of EKG'),
(1, 'Mom', 'car accident', true, 'X-Ray confrimed broken leg. Waiting for cast. Should be released soon.'),
(2, 'Ricky', 'seizure', true, 'Ricky was just taken to another room for an MRI'),
(2, 'Sally', 'hip surgery', false, 'Doctor says surgery was a success and that Sally should be waking up any minute now');

COMMIT;