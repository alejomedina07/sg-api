-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2024-02-14 12:54:35
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 0
-- Created objects: 2
-- Changed objects: 1

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG","SVY","PVD";
-- ddl-end --


-- [ Created objects ] --
-- object: amount_debt | type: COLUMN --
-- ALTER TABLE "PVD".provider DROP COLUMN IF EXISTS amount_debt CASCADE;
ALTER TABLE "PVD".provider ADD COLUMN amount_debt money;
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
-- object: account_payable_uq | type: CONSTRAINT --
-- ALTER TABLE "PVD".account_payable DROP CONSTRAINT IF EXISTS account_payable_uq CASCADE;
ALTER TABLE "PVD".account_payable ADD CONSTRAINT account_payable_uq UNIQUE (expense_id);
-- ddl-end --

