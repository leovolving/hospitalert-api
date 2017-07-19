BEGIN;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
	email TEXT NOT NULL,
	password TEXT,
	name TEXT NOT NULL,
	fb_id TEXT,
	profile_picture TEXT,
	is_logged_in BOOLEAN DEFAULT false
);

CREATE TABLE friends (
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
	user_id INTEGER REFERENCES users ON DELETE CASCADE NOT NULL,
	friend_id INTEGER REFERENCES users ON DELETE CASCADE NOT NULL,
	status TEXT NOT NULL 
);

CREATE TABLE hospitalizations (
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
	user_id INTEGER REFERENCES users ON DELETE CASCADE NOT NULL,
	patient TEXT NOT NULL,
	condition TEXT NOT NULL,
	conscious BOOLEAN,
	latest_update TEXT,
	is_a_form BOOLEAN DEFAULT false
);

COMMIT;