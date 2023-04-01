-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2023-03-31 14:37:07
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 0
-- Created objects: 5
-- Changed objects: 1

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG";
-- ddl-end --


-- [ Dropped objects ] --
ALTER TABLE "INV"."Inventory" DROP COLUMN IF EXISTS status CASCADE;
-- ddl-end --


-- [ Created objects ] --
-- object: status_id | type: COLUMN --
-- ALTER TABLE "INV"."Inventory" DROP COLUMN IF EXISTS status_id CASCADE;
ALTER TABLE "INV"."Inventory" ADD COLUMN status_id integer;
-- ddl-end --


-- object: inventory_status_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "INV".inventory_status_id_idx CASCADE;
CREATE INDEX inventory_status_id_idx ON "INV"."Inventory"
USING btree
(
	status_id
);
-- ddl-end --

-- object: inventory_created_by_idx | type: INDEX --
-- DROP INDEX IF EXISTS "INV".inventory_created_by_idx CASCADE;
CREATE INDEX inventory_created_by_idx ON "INV"."Inventory"
USING btree
(
	created_by
);
-- ddl-end --

-- object: background | type: COLUMN --
-- ALTER TABLE "APMT".appointment_type DROP COLUMN IF EXISTS background CASCADE;
ALTER TABLE "APMT".appointment_type ADD COLUMN background varchar(10);
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
-- -- ddl-end --
--

-- [ Created foreign keys ] --
-- object: "list_Inventory_fk" | type: CONSTRAINT --
-- ALTER TABLE "INV"."Inventory" DROP CONSTRAINT IF EXISTS "list_Inventory_fk" CASCADE;
ALTER TABLE "INV"."Inventory" ADD CONSTRAINT "list_Inventory_fk" FOREIGN KEY (status_id)
REFERENCES "CNFG".list (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

