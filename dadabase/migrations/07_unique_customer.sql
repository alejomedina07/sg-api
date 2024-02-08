-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2024-02-05 15:29:10
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 0
-- Created objects: 1
-- Changed objects: 1

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG","SVY";
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
-- object: document_unique | type: CONSTRAINT --
-- ALTER TABLE "CTM".customer DROP CONSTRAINT IF EXISTS document_unique CASCADE;
ALTER TABLE "CTM".customer ADD CONSTRAINT document_unique UNIQUE (document,document_type_id);
-- ddl-end --

