-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2023-12-22 16:28:43
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 0
-- Created objects: 1
-- Changed objects: 1

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG","SVY";
-- ddl-end --


-- [ Dropped objects ] --
ALTER TABLE "SVY".option_question DROP COLUMN IF EXISTS type CASCADE;
-- ddl-end --


-- [ Created objects ] --
-- object: type | type: COLUMN --
-- ALTER TABLE "SVY".question DROP COLUMN IF EXISTS type CASCADE;
ALTER TABLE "SVY".question ADD COLUMN type varchar(50) NOT NULL;
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
