-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2024-04-19 09:34:47
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 3
-- Created objects: 2
-- Changed objects: 1

-- SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG","SVY","PVD";
-- -- ddl-end --


-- [ Dropped objects ] --
ALTER TABLE "CTM".room DROP CONSTRAINT IF EXISTS type_turn_room_fk CASCADE;
-- ddl-end --
DROP TABLE IF EXISTS "CTM".room CASCADE;
-- ddl-end --
DROP SEQUENCE IF EXISTS "CTM".room_id_seq CASCADE;
-- ddl-end --


-- [ Created objects ] --
-- object: type_turn_id | type: COLUMN --
-- ALTER TABLE "CTM".type_turn DROP COLUMN IF EXISTS type_turn_id CASCADE;
ALTER TABLE "CTM".type_turn ADD COLUMN type_turn_id integer;
-- ddl-end --




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


-- [ Created foreign keys ] --
-- object: list_type_turn_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".type_turn DROP CONSTRAINT IF EXISTS list_type_turn_fk CASCADE;
ALTER TABLE "CTM".type_turn ADD CONSTRAINT list_type_turn_fk FOREIGN KEY (type_turn_id)
REFERENCES "CNFG".list (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

