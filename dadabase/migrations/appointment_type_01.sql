-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2023-03-28 10:26:07
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 0
-- Created objects: 5
-- Changed objects: 1

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG";
-- ddl-end --


-- [ Created objects ] --
-- object: name | type: COLUMN --
-- ALTER TABLE "APMT".appointment DROP COLUMN IF EXISTS name CASCADE;
ALTER TABLE "APMT".appointment ADD COLUMN name text NOT NULL;
-- ddl-end --


-- object: "APMT".appointment_type | type: TABLE --
-- DROP TABLE IF EXISTS "APMT".appointment_type CASCADE;
CREATE TABLE "APMT".appointment_type (
	id serial NOT NULL,
	name text NOT NULL,
	description text,
	created_at timestamp DEFAULT now(),
	status boolean DEFAULT true,
	CONSTRAINT appointment_type_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "APMT".appointment_type OWNER TO root;
-- ddl-end --

-- object: appointment_type_id | type: COLUMN --
-- ALTER TABLE "APMT".appointment DROP COLUMN IF EXISTS appointment_type_id CASCADE;
ALTER TABLE "APMT".appointment ADD COLUMN appointment_type_id integer;
-- ddl-end --


-- object: appointment_appointment_type_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "APMT".appointment_appointment_type_id_idx CASCADE;
CREATE INDEX appointment_appointment_type_id_idx ON "APMT".appointment
USING btree
(
	appointment_type_id
);
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


-- [ Created foreign keys ] --
-- object: appointment_type_appointment_fk | type: CONSTRAINT --
-- ALTER TABLE "APMT".appointment DROP CONSTRAINT IF EXISTS appointment_type_appointment_fk CASCADE;
ALTER TABLE "APMT".appointment ADD CONSTRAINT appointment_type_appointment_fk FOREIGN KEY (appointment_type_id)
REFERENCES "APMT".appointment_type (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

