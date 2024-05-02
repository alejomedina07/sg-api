-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2024-04-30 17:07:19
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
-- object: attended_at | type: COLUMN --
-- ALTER TABLE "CTM".attention DROP COLUMN IF EXISTS attended_at CASCADE;
ALTER TABLE "CTM".attention ADD COLUMN attended_at timestamp;
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
