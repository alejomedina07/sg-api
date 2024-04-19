-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2024-04-19 09:30:26
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 3
-- Created objects: 0
-- Changed objects: 1

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG","SVY","PVD";
-- ddl-end --


-- [ Dropped objects ] --
ALTER TABLE "CTM".room DROP CONSTRAINT IF EXISTS type_turn_room_fk CASCADE;
-- ddl-end --
DROP TABLE IF EXISTS "CTM".room CASCADE;
-- ddl-end --
DROP SEQUENCE IF EXISTS "CTM".room_id_seq CASCADE;
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
