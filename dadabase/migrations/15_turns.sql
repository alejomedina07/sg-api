-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2024-03-27 15:02:05
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 1
-- Created objects: 4
-- Changed objects: 1
--
-- SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG","SVY","PVD";
-- ddl-end --


-- [ Dropped objects ] --
ALTER TABLE "CTM".turn DROP CONSTRAINT IF EXISTS type_turn_turn_fk CASCADE;
-- ddl-end --
ALTER TABLE "CTM".turn DROP COLUMN IF EXISTS created_by CASCADE;
-- ddl-end --
ALTER TABLE "CTM".turn DROP COLUMN IF EXISTS type_turn_id CASCADE;
-- ddl-end --
ALTER TABLE "CTM".attention DROP COLUMN IF EXISTS attent_by CASCADE;
-- ddl-end --


-- [ Created objects ] --
-- object: attention_procedure_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "CTM".attention_procedure_id_idx CASCADE;
CREATE INDEX attention_procedure_id_idx ON "CTM".attention
USING btree
(
	type_turn_id
);
-- ddl-end --

-- object: created_by_id | type: COLUMN --
-- ALTER TABLE "CTM".turn DROP COLUMN IF EXISTS created_by_id CASCADE;
ALTER TABLE "CTM".turn ADD COLUMN created_by_id integer;
-- ddl-end --


-- object: attent_by_id | type: COLUMN --
-- ALTER TABLE "CTM".attention DROP COLUMN IF EXISTS attent_by_id CASCADE;
ALTER TABLE "CTM".attention ADD COLUMN attent_by_id integer;
-- ddl-end --


-- object: is_finish | type: COLUMN --
-- ALTER TABLE "CTM".turn DROP COLUMN IF EXISTS is_finish CASCADE;
ALTER TABLE "CTM".turn ADD COLUMN is_finish boolean DEFAULT false;
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
