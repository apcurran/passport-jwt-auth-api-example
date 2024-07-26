CREATE TABLE app_user(
    user_id SERIAL PRIMARY KEY
    email TEXT NOT NULL UNIQUE
    hashed_password TEXT NOT NULL
);
