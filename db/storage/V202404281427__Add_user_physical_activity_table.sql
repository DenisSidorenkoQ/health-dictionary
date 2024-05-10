create table user_doctor_visit
(
    id                 BIGSERIAL NOT NULL UNIQUE PRIMARY KEY,
    user_id            BIGINTEGER NOT NULL,
    activity_name      TEXT NOT NULL,
    activity_time      INT NOT NULL,
    date               TIMESTAMP
);
