-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2023-04-09 18:17:49
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 0
-- Created objects: 1
-- Changed objects: 1

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG";
-- ddl-end --


-- [ Dropped objects ] --
ALTER TABLE "INV".inventory_in_out DROP COLUMN IF EXISTS type CASCADE;
-- ddl-end --


-- [ Created objects ] --
-- object: increment | type: COLUMN --
-- ALTER TABLE "INV".inventory_in_out DROP COLUMN IF EXISTS increment CASCADE;
ALTER TABLE "INV".inventory_in_out ADD COLUMN increment boolean NOT NULL;
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
