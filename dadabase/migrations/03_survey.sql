-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2023-12-21 14:34:21
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 3
-- Created objects: 2
-- Changed objects: 1

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG","SVY";
-- ddl-end --


-- [ Dropped objects ] --
-- ddl-end --
ALTER TABLE "SVY".category DROP CONSTRAINT IF EXISTS survey_category_fk CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS "SVY".category_survey_id_idx CASCADE;
-- ddl-end --
ALTER TABLE "SVY".category DROP COLUMN IF EXISTS survey_id CASCADE;
-- ddl-end --


-- [ Created objects ] --
-- object: survey_created_by_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVY".survey_created_by_id_idx CASCADE;
CREATE INDEX survey_created_by_id_idx ON "SVY".survey
USING btree
(
	created_by
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
-- ddl-end --


-- [ Created foreign keys ] --
-- object: user_survey_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".survey DROP CONSTRAINT IF EXISTS user_survey_fk CASCADE;
ALTER TABLE "SVY".survey ADD CONSTRAINT user_survey_fk FOREIGN KEY (created_by)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

