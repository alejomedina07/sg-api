-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2023-06-05 17:27:09
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 0
-- Created objects: 2
-- Changed objects: 1
--
-- SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG";
-- -- ddl-end --


-- [ Created objects ] --
-- object: birth_date | type: COLUMN --
-- ALTER TABLE "CTM".customer DROP COLUMN IF EXISTS birth_date CASCADE;
ALTER TABLE "CTM".customer ADD COLUMN birth_date timestamp;
-- ddl-end --


-- object: description | type: COLUMN --
-- ALTER TABLE "CTM".customer DROP COLUMN IF EXISTS description CASCADE;
ALTER TABLE "CTM".customer ADD COLUMN description text;
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
-- -- ddl-end --
