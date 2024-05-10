create table user_diet
(
    id                 BIGSERIAL NOT NULL UNIQUE PRIMARY KEY,
    user_id            BIGINTEGER NOT NULL,
    food_name          TEXT NOT NULL,
    calories           FLOAT NOT NULL,
    sugar              FLOAT NOT NULL,
    date               TIMESTAMP
);
