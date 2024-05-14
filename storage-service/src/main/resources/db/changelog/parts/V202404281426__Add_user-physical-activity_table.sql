--liquibase formatted sql
--changeset Denis:1
create table user_physical_activity
(
    id                 BIGSERIAL NOT NULL UNIQUE PRIMARY KEY,
    user_id            BIGINT NOT NULL,
    activity_type      TEXT NOT NULL,
    activity_time      BIGINT NOT NULL,
    date               TIMESTAMP NOT NULL
);
