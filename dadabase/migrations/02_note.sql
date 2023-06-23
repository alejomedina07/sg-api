-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2023-06-16 17:42:26
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 0
-- Created objects: 3
-- Changed objects: 1

-- SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG";
-- ddl-end --


-- [ Created objects ] --
-- object: "CNFG".note | type: TABLE --
-- DROP TABLE IF EXISTS "CNFG".note CASCADE;
CREATE TABLE "CNFG".note (
	id serial NOT NULL,
	title text NOT NULL,
	description text NOT NULL,
	created_at timestamp DEFAULT now(),
	created_by integer,
	entity_type text NOT NULL,
	entity_id integer NOT NULL,
	CONSTRAINT note_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "CNFG".note OWNER TO root;
-- ddl-end --

-- object: note_user_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "CNFG".note_user_id_idx CASCADE;
CREATE INDEX note_user_id_idx ON "CNFG".note
USING btree
(
	created_by
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
-- object: user_note_fk | type: CONSTRAINT --
-- ALTER TABLE "CNFG".note DROP CONSTRAINT IF EXISTS user_note_fk CASCADE;
ALTER TABLE "CNFG".note ADD CONSTRAINT user_note_fk FOREIGN KEY (created_by)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

