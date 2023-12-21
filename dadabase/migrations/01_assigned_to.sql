-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2023-12-19 15:42:25
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 1
-- Created objects: 3
-- Changed objects: 1

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG";
-- ddl-end --


-- [ Dropped objects ] --
ALTER TABLE "SVC".procedure_procedure DROP CONSTRAINT IF EXISTS procedure_procedure_pk CASCADE;
-- ddl-end --


-- [ Created objects ] --
-- object: assigned_to_id | type: COLUMN --
-- ALTER TABLE "APMT".appointment DROP COLUMN IF EXISTS assigned_to_id CASCADE;
ALTER TABLE "APMT".appointment ADD COLUMN assigned_to_id integer;
-- ddl-end --


-- object: assigned_to_appointment_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "APMT".assigned_to_appointment_id_idx CASCADE;
CREATE INDEX assigned_to_appointment_id_idx ON "APMT".appointment
USING btree
(
	assigned_to_id
);
-- ddl-end --


--
-- -- [ Changed objects ] --
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
-- object: user_appointment_fk1 | type: CONSTRAINT --
-- ALTER TABLE "APMT".appointment DROP CONSTRAINT IF EXISTS user_appointment_fk1 CASCADE;
ALTER TABLE "APMT".appointment ADD CONSTRAINT user_appointment_fk1 FOREIGN KEY (assigned_to_id)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --


-- [ Created constraints ] --
-- object: procedure_procedure_pk | type: CONSTRAINT --
-- ALTER TABLE "SVC".procedure_procedure DROP CONSTRAINT IF EXISTS procedure_procedure_pk CASCADE;
ALTER TABLE "SVC".procedure_procedure ADD CONSTRAINT procedure_procedure_pk PRIMARY KEY (id);
-- ddl-end --