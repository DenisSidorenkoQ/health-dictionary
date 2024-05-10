create table role
(
    id         BIGSERIAL NOT NULL UNIQUE PRIMARY KEY,
    name       TEXT UNIQUE NOT NULL
);

INSERT INTO public.role (name) VALUES ('ADMIN'), ('STUDENT'), ('TEACHER')
