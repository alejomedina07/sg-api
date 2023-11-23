-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2023-09-18 16:39:52
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 0
-- Created objects: 1
-- Changed objects: 1

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG";
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


-- [ Created constraints ] --
-- object: procedure_procedure_pk | type: CONSTRAINT --
-- ALTER TABLE "SVC".procedure_procedure DROP CONSTRAINT IF EXISTS procedure_procedure_pk CASCADE;
ALTER TABLE "SVC".procedure_procedure ADD CONSTRAINT procedure_procedure_pk PRIMARY KEY (id);
-- ddl-end --

