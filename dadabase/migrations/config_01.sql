-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2023-03-23 13:44:20
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 0
-- Created objects: 11
-- Changed objects: 1

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG";
-- ddl-end --


-- [ Dropped objects ] --
ALTER TABLE "USR"."user" DROP COLUMN IF EXISTS document_type CASCADE;
-- ddl-end --
ALTER TABLE "USR"."user" DROP COLUMN IF EXISTS status CASCADE;
-- ddl-end --


-- [ Created objects ] --
-- object: "CNFG" | type: SCHEMA --
-- DROP SCHEMA IF EXISTS "CNFG" CASCADE;
CREATE SCHEMA "CNFG";
-- ddl-end --
ALTER SCHEMA "CNFG" OWNER TO root;
-- ddl-end --

-- object: "CNFG".list | type: TABLE --
-- DROP TABLE IF EXISTS "CNFG".list CASCADE;
CREATE TABLE "CNFG".list (
	id serial NOT NULL,
	name text NOT NULL,
	key text NOT NULL,
	description text,
	created_at timestamp DEFAULT now(),
	updated_at timestamp,
	status boolean DEFAULT true,
	CONSTRAINT "List_pk" PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "CNFG".list OWNER TO root;
-- ddl-end --

-- object: document_type_id | type: COLUMN --
-- ALTER TABLE "USR"."user" DROP COLUMN IF EXISTS document_type_id CASCADE;
ALTER TABLE "USR"."user" ADD COLUMN document_type_id integer;
-- ddl-end --


-- object: status_id | type: COLUMN --
-- ALTER TABLE "USR"."user" DROP COLUMN IF EXISTS status_id CASCADE;
ALTER TABLE "USR"."user" ADD COLUMN status_id integer;
-- ddl-end --


-- object: user_status_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "USR".user_status_id_idx CASCADE;
CREATE INDEX user_status_id_idx ON "USR"."user"
USING btree
(
	status_id
);
-- ddl-end --

-- object: user_document_type_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "USR".user_document_type_id_idx CASCADE;
CREATE INDEX user_document_type_id_idx ON "USR"."user"
USING btree
(
	document_type_id
);
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
-- object: document_number_unique | type: CONSTRAINT --
-- ALTER TABLE "USR"."user" DROP CONSTRAINT IF EXISTS document_number_unique CASCADE;
ALTER TABLE "USR"."user" ADD CONSTRAINT document_number_unique UNIQUE (document_number);
-- ddl-end --

-- object: email_unique | type: CONSTRAINT --
-- ALTER TABLE "USR"."user" DROP CONSTRAINT IF EXISTS email_unique CASCADE;
ALTER TABLE "USR"."user" ADD CONSTRAINT email_unique UNIQUE (email);
-- ddl-end --

-- object: phone_unique | type: CONSTRAINT --
-- ALTER TABLE "USR"."user" DROP CONSTRAINT IF EXISTS phone_unique CASCADE;
ALTER TABLE "USR"."user" ADD CONSTRAINT phone_unique UNIQUE (phone_number);
-- ddl-end --



-- [ Created foreign keys ] --
-- object: list_user_fk | type: CONSTRAINT --
-- ALTER TABLE "USR"."user" DROP CONSTRAINT IF EXISTS list_user_fk CASCADE;
ALTER TABLE "USR"."user" ADD CONSTRAINT list_user_fk FOREIGN KEY (document_type_id)
REFERENCES "CNFG".list (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: list_user_fk1 | type: CONSTRAINT --
-- ALTER TABLE "USR"."user" DROP CONSTRAINT IF EXISTS list_user_fk1 CASCADE;
ALTER TABLE "USR"."user" ADD CONSTRAINT list_user_fk1 FOREIGN KEY (status_id)
REFERENCES "CNFG".list (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

