-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2024-01-19 14:30:28
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 0
-- Created objects: 3
-- Changed objects: 1

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG","SVY";
-- ddl-end --


-- [ Created objects ] --
-- object: survey_id | type: COLUMN --
-- ALTER TABLE "SVY".answer DROP COLUMN IF EXISTS survey_id CASCADE;
ALTER TABLE "SVY".answer ADD COLUMN survey_id integer;
-- ddl-end --


-- object: answer_survey_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVY".answer_survey_id_idx CASCADE;
CREATE INDEX answer_survey_id_idx ON "SVY".answer
USING btree
(
	survey_id
);
-- ddl-end --



-- [ Changed objects ] --
-- ALTER ROLE root
-- 	NOSUPERUSER
-- 	NOCREATEDB
-- 	NOCREATEROLE
-- 	NOINHERIT
-- 	NOLOGIN
-- 	NOREPLICATION
-- 	NOBYPASSRLS
-- 	UNENCRYPTED PASSWORD 'Id70pP%2C!3S';
-- -- ddl-end --


-- [ Created foreign keys ] --
-- object: survey_answer_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".answer DROP CONSTRAINT IF EXISTS survey_answer_fk CASCADE;
ALTER TABLE "SVY".answer ADD CONSTRAINT survey_answer_fk FOREIGN KEY (survey_id)
REFERENCES "SVY".survey (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

