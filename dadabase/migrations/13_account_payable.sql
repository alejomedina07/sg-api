-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2024-02-19 15:35:50
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 0
-- Created objects: 2
-- Changed objects: 2

-- SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG","SVY","PVD";
-- ddl-end --


-- [ Created objects ] --
-- object: amount | type: COLUMN --
-- ALTER TABLE "PVD".account_payable DROP COLUMN IF EXISTS amount CASCADE;
ALTER TABLE "PVD".account_payable ADD COLUMN amount money NOT NULL;
-- ddl-end --


-- object: amount_paid | type: COLUMN --
-- ALTER TABLE "PVD".account_payable DROP COLUMN IF EXISTS amount_paid CASCADE;
ALTER TABLE "PVD".account_payable ADD COLUMN amount_paid money DEFAULT 0;
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
ALTER TABLE "PVD".provider ALTER COLUMN amount_debt SET DEFAULT 0;
-- ddl-end --
