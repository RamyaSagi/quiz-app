-- Table: public.category

-- DROP TABLE public.category;

CREATE TABLE public.category
(
    id integer NOT NULL DEFAULT nextval('category_id_seq'::regclass),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.category
    OWNER to postgres;

-- Table: public.question

-- DROP TABLE public.question;

CREATE TABLE public.question
(
    id integer NOT NULL DEFAULT nextval('question_id_seq'::regclass),
    question character varying COLLATE pg_catalog."default" NOT NULL,
    options text COLLATE pg_catalog."default",
    "correctOptionIndex" integer NOT NULL,
    "categoryId" integer NOT NULL,
    CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY (id),
    CONSTRAINT "FK_b8dd754e373b56714ddfa8f545c" FOREIGN KEY ("categoryId")
        REFERENCES public.category (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.question
    OWNER to postgres;


-- Table: public.user

-- DROP TABLE public."user";

CREATE TABLE public."user"
(
    id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."user"
    OWNER to postgres;

INSERT INTO public.question(
	id, question, options, "correctOptionIndex", "categoryId")
	VALUES (?, ?, ?, ?, ?);

INSERT INTO public."user"(
	id, name, password)
	VALUES (?, ?, ?);

INSERT INTO public.category(
	id, name)
	VALUES (?, ?);