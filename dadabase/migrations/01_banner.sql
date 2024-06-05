-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2024-05-16 17:10:39
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 0
-- Created objects: 1
-- Changed objects: 1

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG","SVY","PVD";
-- ddl-end --


-- [ Created objects ] --
-- object: "CNFG".banner | type: TABLE --
-- DROP TABLE IF EXISTS "CNFG".banner CASCADE;
CREATE TABLE "CNFG".banner (
	id serial,
	name varchar(200) NOT NULL,
	description text,
	status boolean DEFAULT true,
	created_at timestamp DEFAULT now(),
	photo varchar(200)

);
-- ddl-end --
ALTER TABLE "CNFG".banner OWNER TO root;
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
