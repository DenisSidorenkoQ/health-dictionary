--liquibase formatted sql
--changeset Denis:1
create table user_diet
(
    id                 BIGSERIAL NOT NULL UNIQUE PRIMARY KEY,
    user_id            BIGINT NOT NULL,
    food_name          TEXT NOT NULL,
    calories           FLOAT NOT NULL,
    date               TIMESTAMP
);
