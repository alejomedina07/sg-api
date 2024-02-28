-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2024-02-15 13:15:34
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 2
-- Created objects: 4
-- Changed objects: 1

-- SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG","SVY","PVD";
-- ddl-end --


-- [ Dropped objects ] --
ALTER TABLE "PVD".account_payable DROP CONSTRAINT IF EXISTS expense_account_payable_fk CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS "PVD".account_payable_expense_id_idx CASCADE;
-- ddl-end --
ALTER TABLE "PVD".account_payable DROP COLUMN IF EXISTS expense_id CASCADE;
-- ddl-end --


-- [ Created objects ] --
-- object: expense_id | type: COLUMN --
-- ALTER TABLE "PVD".payment DROP COLUMN IF EXISTS expense_id CASCADE;
ALTER TABLE "PVD".payment ADD COLUMN expense_id integer;
-- ddl-end --


-- object: payment_expense_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "PVD".payment_expense_id_idx CASCADE;
CREATE INDEX payment_expense_id_idx ON "PVD".payment
USING btree
(
	expense_id
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


-- [ Created constraints ] --
-- object: payment_uq | type: CONSTRAINT --
-- ALTER TABLE "PVD".payment DROP CONSTRAINT IF EXISTS payment_uq CASCADE;
ALTER TABLE "PVD".payment ADD CONSTRAINT payment_uq UNIQUE (expense_id);
-- ddl-end --



-- [ Created foreign keys ] --
-- object: expense_payment_fk | type: CONSTRAINT --
-- ALTER TABLE "PVD".payment DROP CONSTRAINT IF EXISTS expense_payment_fk CASCADE;
ALTER TABLE "PVD".payment ADD CONSTRAINT expense_payment_fk FOREIGN KEY (expense_id)
REFERENCES "INV".expense (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

