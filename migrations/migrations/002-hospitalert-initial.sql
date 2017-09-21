BEGIN;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
    advocate INTEGER REFERENCES users ON DELETE CASCADE,
	email TEXT NOT NULL,
	password TEXT,
	name TEXT NOT NULL,
	fb_id TEXT,
	profile_picture TEXT,
	is_logged_in BOOLEAN DEFAULT false
);

CREATE TABLE hospitalizations (
	id SERIAL PRIMARY KEY,
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
	user_id INTEGER REFERENCES users ON DELETE CASCADE NOT NULL,
	condition TEXT NOT NULL,
	conscious BOOLEAN,
	latest_update TEXT,
    last_updated_by INTEGER REFERENCES users ON DELETE CASCADE,
	is_a_form BOOLEAN DEFAULT false
);

CREATE TABLE followers (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    user_id INTEGER REFERENCES users ON DELETE CASCADE NOT NULL,
    follower_id INTEGER REFERENCES users ON DELETE CASCADE NOT NULL
);

COMMIT;