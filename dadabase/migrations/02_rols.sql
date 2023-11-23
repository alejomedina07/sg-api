-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2023-09-18 16:18:42
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 1
-- Created objects: 6
-- Changed objects: 1

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG";
-- ddl-end --


-- [ Dropped objects ] --
DROP INDEX IF EXISTS "CNFG".note_user_id_idx CASCADE;
-- ddl-end --
ALTER TABLE "CTM".turn DROP COLUMN IF EXISTS name CASCADE;
-- ddl-end --
ALTER TABLE "CTM".turn DROP COLUMN IF EXISTS document CASCADE;
-- ddl-end --
ALTER TABLE "CTM".turn DROP COLUMN IF EXISTS phone_number CASCADE;
-- ddl-end --


-- [ Created objects ] --
-- object: full_name | type: COLUMN --
-- ALTER TABLE "CTM".turn DROP COLUMN IF EXISTS full_name CASCADE;
ALTER TABLE "CTM".turn ADD COLUMN full_name varchar(50) NOT NULL;
-- ddl-end --


-- object: "USR".rol_permissions | type: TABLE --
-- DROP TABLE IF EXISTS "USR".rol_permissions CASCADE;
CREATE TABLE "USR".rol_permissions (
	id serial NOT NULL,
	rol_id integer,
	permissions_id integer,
	CONSTRAINT rol_permissions_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "USR".rol_permissions OWNER TO root;
-- ddl-end --

-- object: rol_id_rol_permissions_idx | type: INDEX --
-- DROP INDEX IF EXISTS "USR".rol_id_rol_permissions_idx CASCADE;
CREATE INDEX rol_id_rol_permissions_idx ON "USR".rol_permissions
USING btree
(
	rol_id
);
-- ddl-end --

-- object: permissions_id_rol_permissions_idx | type: INDEX --
-- DROP INDEX IF EXISTS "USR".permissions_id_rol_permissions_idx CASCADE;
CREATE INDEX permissions_id_rol_permissions_idx ON "USR".rol_permissions
USING btree
(
	permissions_id
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
-- object: rol_rol_permissions_fk | type: CONSTRAINT --
-- ALTER TABLE "USR".rol_permissions DROP CONSTRAINT IF EXISTS rol_rol_permissions_fk CASCADE;
ALTER TABLE "USR".rol_permissions ADD CONSTRAINT rol_rol_permissions_fk FOREIGN KEY (rol_id)
REFERENCES "USR".rol (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: permissions_rol_permissions_fk | type: CONSTRAINT --
-- ALTER TABLE "USR".rol_permissions DROP CONSTRAINT IF EXISTS permissions_rol_permissions_fk CASCADE;
ALTER TABLE "USR".rol_permissions ADD CONSTRAINT permissions_rol_permissions_fk FOREIGN KEY (permissions_id)
REFERENCES "USR".permissions (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

