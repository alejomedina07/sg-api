-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2023-12-21 11:27:47
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 1
-- Created objects: 16
-- Changed objects: 1

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG","SVY";
-- ddl-end --


-- [ Dropped objects ] --
ALTER TABLE "SVC".procedure_procedure DROP CONSTRAINT IF EXISTS procedure_procedure_pk CASCADE;
-- ddl-end --


-- [ Created objects ] --
-- object: "SVY" | type: SCHEMA --
-- DROP SCHEMA IF EXISTS "SVY" CASCADE;
CREATE SCHEMA "SVY";
-- ddl-end --
ALTER SCHEMA "SVY" OWNER TO root;
-- ddl-end --

-- object: "SVY".survey | type: TABLE --
-- DROP TABLE IF EXISTS "SVY".survey CASCADE;
CREATE TABLE "SVY".survey (
	id serial NOT NULL,
	name text NOT NULL,
	description text,
	created_at timestamp DEFAULT now(),
	creaetd_by integer,
	CONSTRAINT survey_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "SVY".survey OWNER TO root;
-- ddl-end --

-- object: "SVY".category | type: TABLE --
-- DROP TABLE IF EXISTS "SVY".category CASCADE;
CREATE TABLE "SVY".category (
	id serial NOT NULL,
	name text NOT NULL,
	description text,
	created_at timestamp DEFAULT now(),
	status boolean DEFAULT true,
	survey_id integer,
	CONSTRAINT category_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "SVY".category OWNER TO root;
-- ddl-end --

-- object: "SVY".question | type: TABLE --
-- DROP TABLE IF EXISTS "SVY".question CASCADE;
CREATE TABLE "SVY".question (
	id serial NOT NULL,
	name text NOT NULL,
	description text,
	status boolean DEFAULT true,
	created_at timestamp DEFAULT now(),
	category_id integer,
	CONSTRAINT question_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "SVY".question OWNER TO root;
-- ddl-end --

-- object: "SVY".option_question | type: TABLE --
-- DROP TABLE IF EXISTS "SVY".option_question CASCADE;
CREATE TABLE "SVY".option_question (
	id serial NOT NULL,
	name text NOT NULL,
	description text,
	created_at timestamp DEFAULT now(),
	question_id integer,
	CONSTRAINT option_question_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "SVY".option_question OWNER TO root;
-- ddl-end --

-- object: "SVY".answer | type: TABLE --
-- DROP TABLE IF EXISTS "SVY".answer CASCADE;
CREATE TABLE "SVY".answer (
	id serial NOT NULL,
	created_at timestamp DEFAULT now(),
	question_id integer,
	option_question_id integer,
	user_id integer,
	CONSTRAINT answer_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "SVY".answer OWNER TO postgres;
-- ddl-end --

-- object: "SVY".survey_category | type: TABLE --
-- DROP TABLE IF EXISTS "SVY".survey_category CASCADE;
CREATE TABLE "SVY".survey_category (
	id serial NOT NULL,
	survey_id integer,
	category_id integer,
	CONSTRAINT survey_category_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "SVY".survey_category OWNER TO root;
-- ddl-end --



-- [ Changed objects ] --
ALTER ROLE root
	NOSUPERUSER
	NOCREATEDB
	NOCREATEROLE
	NOINHERIT
	NOLOGIN
	NOREPLICATION
	NOBYPASSRLS
	UNENCRYPTED PASSWORD 'Id70pP%2C!3S';
-- ddl-end --


-- [ Created foreign keys ] --
-- object: category_question_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".question DROP CONSTRAINT IF EXISTS category_question_fk CASCADE;
ALTER TABLE "SVY".question ADD CONSTRAINT category_question_fk FOREIGN KEY (category_id)
REFERENCES "SVY".category (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: survey_category_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".category DROP CONSTRAINT IF EXISTS survey_category_fk CASCADE;
ALTER TABLE "SVY".category ADD CONSTRAINT survey_category_fk FOREIGN KEY (survey_id)
REFERENCES "SVY".survey (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_survey_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".survey DROP CONSTRAINT IF EXISTS user_survey_fk CASCADE;
ALTER TABLE "SVY".survey ADD CONSTRAINT user_survey_fk FOREIGN KEY (creaetd_by)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: question_option_question_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".option_question DROP CONSTRAINT IF EXISTS question_option_question_fk CASCADE;
ALTER TABLE "SVY".option_question ADD CONSTRAINT question_option_question_fk FOREIGN KEY (question_id)
REFERENCES "SVY".question (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: question_answer_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".answer DROP CONSTRAINT IF EXISTS question_answer_fk CASCADE;
ALTER TABLE "SVY".answer ADD CONSTRAINT question_answer_fk FOREIGN KEY (question_id)
REFERENCES "SVY".question (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: option_question_answer_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".answer DROP CONSTRAINT IF EXISTS option_question_answer_fk CASCADE;
ALTER TABLE "SVY".answer ADD CONSTRAINT option_question_answer_fk FOREIGN KEY (option_question_id)
REFERENCES "SVY".option_question (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: survey_survey_category_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".survey_category DROP CONSTRAINT IF EXISTS survey_survey_category_fk CASCADE;
ALTER TABLE "SVY".survey_category ADD CONSTRAINT survey_survey_category_fk FOREIGN KEY (survey_id)
REFERENCES "SVY".survey (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: category_survey_category_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".survey_category DROP CONSTRAINT IF EXISTS category_survey_category_fk CASCADE;
ALTER TABLE "SVY".survey_category ADD CONSTRAINT category_survey_category_fk FOREIGN KEY (category_id)
REFERENCES "SVY".category (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_answer_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".answer DROP CONSTRAINT IF EXISTS user_answer_fk CASCADE;
ALTER TABLE "SVY".answer ADD CONSTRAINT user_answer_fk FOREIGN KEY (user_id)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

