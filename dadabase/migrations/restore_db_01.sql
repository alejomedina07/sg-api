-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2023-04-09 18:11:14
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 8
-- Created objects: 6
-- Changed objects: 1

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG";
-- ddl-end --


-- [ Dropped objects ] --
ALTER TABLE "INV".expense DROP CONSTRAINT IF EXISTS expense_type_expense_fk CASCADE;
-- ddl-end --
ALTER TABLE "SVC".service DROP CONSTRAINT IF EXISTS service_type_service_fk CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS "INV".expense_expense_type_id_idx CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS "SVC".service_service_type_id_idx CASCADE;
-- ddl-end --
DROP TABLE IF EXISTS "INV".expense_type CASCADE;
-- ddl-end --
DROP SEQUENCE IF EXISTS "INV".expense_type_id_seq CASCADE;
-- ddl-end --
DROP TABLE IF EXISTS "SVC".service_type CASCADE;
-- ddl-end --
DROP SEQUENCE IF EXISTS "SVC".service_type_id_seq CASCADE;
-- ddl-end --
ALTER TABLE "SVC".service DROP COLUMN IF EXISTS service_type_id CASCADE;
-- ddl-end --
ALTER TABLE "INV".expense DROP COLUMN IF EXISTS expense_type_id CASCADE;
-- ddl-end --



-- object: type_id | type: COLUMN --
-- ALTER TABLE "INV".expense DROP COLUMN IF EXISTS type_id CASCADE;
ALTER TABLE "INV".expense ADD COLUMN type_id integer;
-- ddl-end --


-- object: type_id | type: COLUMN --
-- ALTER TABLE "SVC".service DROP COLUMN IF EXISTS type_id CASCADE;
ALTER TABLE "SVC".service ADD COLUMN type_id integer;
-- ddl-end --


-- object: service_type_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVC".service_type_id_idx CASCADE;
CREATE INDEX service_type_id_idx ON "SVC".service
USING btree
(
	type_id
);
-- ddl-end --


-- [ Created objects ] --
-- object: expense_type_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "INV".expense_type_id_idx CASCADE;
CREATE INDEX expense_type_id_idx ON "INV".expense
    USING btree
    (
    type_id
    );
-- ddl-end --

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


-- [ Created foreign keys ] --
-- object: list_expense_fk | type: CONSTRAINT --
-- ALTER TABLE "INV".expense DROP CONSTRAINT IF EXISTS list_expense_fk CASCADE;
ALTER TABLE "INV".expense ADD CONSTRAINT list_expense_fk FOREIGN KEY (type_id)
REFERENCES "CNFG".list (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: list_service_fk1 | type: CONSTRAINT --
-- ALTER TABLE "SVC".service DROP CONSTRAINT IF EXISTS list_service_fk1 CASCADE;
ALTER TABLE "SVC".service ADD CONSTRAINT list_service_fk1 FOREIGN KEY (type_id)
REFERENCES "CNFG".list (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- ALTER TABLE "INV".inventory_in_out ALTER COLUMN type TYPE boolean USING CASE WHEN type = 'i' THEN true WHEN type = 'x' THEN false END;


ALTER TABLE "INV".inventory_in_out DROP COLUMN IF EXISTS type CASCADE;
ALTER TABLE "INV".inventory_in_out ADD COLUMN increment boolean;
UPDATE "INV".inventory_in_out SET increment = false WHERE increment IS NULL;