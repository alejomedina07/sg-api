-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2023-03-27 13:14:22
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
DROP INDEX IF EXISTS "APMT".appointmet_user_id_idx CASCADE;
-- ddl-end --
ALTER TABLE "APMT".appointment DROP COLUMN IF EXISTS craeted_at CASCADE;
-- ddl-end --


-- [ Created objects ] --
-- object: created_at | type: COLUMN --
-- ALTER TABLE "APMT".appointment DROP COLUMN IF EXISTS created_at CASCADE;
ALTER TABLE "APMT".appointment ADD COLUMN created_at timestamp DEFAULT now();
-- ddl-end --


-- object: appointment_user_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "APMT".appointment_user_id_idx CASCADE;
CREATE INDEX appointment_user_id_idx ON "APMT".appointment
USING btree
(
	created_by
);
-- ddl-end --

-- object: "default" | type: COLUMN --
-- ALTER TABLE "CNFG".list DROP COLUMN IF EXISTS "default" CASCADE;
ALTER TABLE "CNFG".list ADD COLUMN "default" boolean;
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
