--liquibase formatted sql
--changeset Denis:1
create table user_physical_activity
(
    id                 BIGSERIAL NOT NULL UNIQUE PRIMARY KEY,
    user_id            BIGINT NOT NULL,
    name               TEXT NOT NULL,
    description        TEXT NOT NULL,
    date               TIMESTAMP NOT NULL,
    is_notified        BOOLEAN NOT NULL
);
