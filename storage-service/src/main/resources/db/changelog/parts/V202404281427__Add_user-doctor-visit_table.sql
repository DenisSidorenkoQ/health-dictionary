--liquibase formatted sql
--changeset Denis:1
create table user_doctor_visit
(
    id                 BIGSERIAL NOT NULL UNIQUE PRIMARY KEY,
    user_id            BIGINT NOT NULL,
    name               TEXT NOT NULL,
    doctor_name        TEXT,
    description        TEXT,
    date               TIMESTAMP NOT NULL,
    is_notified        BOOLEAN NOT NULL
);
