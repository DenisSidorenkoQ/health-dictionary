--liquibase formatted sql
--changeset Denis:1
create table users
(
    id                              BIGSERIAL NOT NULL UNIQUE PRIMARY KEY,
    login                           TEXT UNIQUE NOT NULL,
    password                        TEXT NOT NULL,
    role_name                       TEXT NOT NULL,
    mail                            TEXT,
    age                             INTEGER,
    sex                             TEXT,
    height                          INTEGER,
    weight                          INTEGER,
    frequency_physical_activity     TEXT,
    is_notify                       BOOLEAN
);
