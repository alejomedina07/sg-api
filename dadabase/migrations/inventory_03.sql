-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2023-04-24 18:29:36
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 0
-- Created objects: 2
-- Changed objects: 3

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG";
-- ddl-end --


-- [ Created objects ] --
-- object: created_at | type: COLUMN --
-- ALTER TABLE "INV".inventory_in_out DROP COLUMN IF EXISTS created_at CASCADE;
ALTER TABLE "INV".inventory_in_out ADD COLUMN created_at timestamp DEFAULT now();
-- ddl-end --


-- object: note | type: COLUMN --
-- ALTER TABLE "INV".inventory_in_out DROP COLUMN IF EXISTS note CASCADE;
ALTER TABLE "INV".inventory_in_out ADD COLUMN note text;
-- ddl-end --


--
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
-- ddl-end --
ALTER TABLE "INV"."Inventory" ALTER COLUMN quantity SET DEFAULT 0;
-- ddl-end --
ALTER TABLE "INV".inventory_in_out ALTER COLUMN increment SET NOT NULL;
-- ddl-end --
