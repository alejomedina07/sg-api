-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2024-04-26 15:47:12
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 0
-- Created objects: 1
-- Changed objects: 1

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG","SVY","PVD";
-- ddl-end --


-- [ Created objects ] --
-- object: note | type: COLUMN --
-- ALTER TABLE "CTM".turn DROP COLUMN IF EXISTS note CASCADE;
ALTER TABLE "CTM".turn ADD COLUMN note text;
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
