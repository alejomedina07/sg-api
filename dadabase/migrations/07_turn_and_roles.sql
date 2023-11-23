-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2023-09-08 16:46:14
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 1
-- Created objects: 39
-- Changed objects: 1
--
-- SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG";
-- -- ddl-end --
--
--
-- -- [ Dropped objects ] --
-- DROP INDEX IF EXISTS "CNFG".note_user_id_idx CASCADE;
-- -- ddl-end --


-- [ Created objects ] --
-- object: "USR".permissions | type: TABLE --
-- DROP TABLE IF EXISTS "USR".permissions CASCADE;
CREATE TABLE "USR".permissions (
	id serial NOT NULL,
	name varchar(50) NOT NULL,
	description text,
	created_at timestamp DEFAULT now(),
	created_by integer,
	CONSTRAINT permissions_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "USR".permissions OWNER TO root;
-- ddl-end --

-- object: "USR".privileges | type: TABLE --
-- DROP TABLE IF EXISTS "USR".privileges CASCADE;
CREATE TABLE "USR".privileges (
	id serial NOT NULL,
	name varchar(50) NOT NULL,
	description text,
	created_at timestamp DEFAULT now(),
	created_by integer,
	CONSTRAINT privileges_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "USR".privileges OWNER TO root;
-- ddl-end --

-- object: "USR".rol_privileges | type: TABLE --
-- DROP TABLE IF EXISTS "USR".rol_privileges CASCADE;
CREATE TABLE "USR".rol_privileges (
	id serial NOT NULL,
	rol_id integer,
	privileges_id integer,
	CONSTRAINT rol_privileges_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "USR".rol_privileges OWNER TO root;
-- ddl-end --

-- object: "USR".permissions_privileges | type: TABLE --
-- DROP TABLE IF EXISTS "USR".permissions_privileges CASCADE;
CREATE TABLE "USR".permissions_privileges (
	id serial NOT NULL,
	permissions_id integer,
	privileges_id integer,
	CONSTRAINT permissions_privileges_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "USR".permissions_privileges OWNER TO root;
-- ddl-end --


ALTER TABLE "USR".rol ADD COLUMN created_by integer;

-- object: rol_created_by_idx | type: INDEX --
-- DROP INDEX IF EXISTS "USR".rol_created_by_idx CASCADE;
CREATE INDEX rol_created_by_idx ON "USR".rol
USING btree
(
	created_by
);
-- ddl-end --

-- object: permissions_created_by_idx | type: INDEX --
-- DROP INDEX IF EXISTS "USR".permissions_created_by_idx CASCADE;
CREATE INDEX permissions_created_by_idx ON "USR".permissions
USING btree
(
	created_by
);
-- ddl-end --

-- object: rol_privileges_rol_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "USR".rol_privileges_rol_id_idx CASCADE;
CREATE INDEX rol_privileges_rol_id_idx ON "USR".rol_privileges
USING btree
(
	rol_id
);
-- ddl-end --

-- object: rol_privileges_privileges_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "USR".rol_privileges_privileges_id_idx CASCADE;
CREATE INDEX rol_privileges_privileges_id_idx ON "USR".rol_privileges
USING btree
(
	privileges_id
);
-- ddl-end --

-- object: permissions_privileges_permissions_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "USR".permissions_privileges_permissions_id_idx CASCADE;
CREATE INDEX permissions_privileges_permissions_id_idx ON "USR".permissions_privileges
USING btree
(
	permissions_id
);
-- ddl-end --

-- object: permissions_privileges_privileges_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "USR".permissions_privileges_privileges_id_idx CASCADE;
CREATE INDEX permissions_privileges_privileges_id_idx ON "USR".permissions_privileges
USING btree
(
	privileges_id
);
-- ddl-end --

-- object: privileges_created_by_idx | type: INDEX --
-- DROP INDEX IF EXISTS "USR".privileges_created_by_idx CASCADE;
CREATE INDEX privileges_created_by_idx ON "USR".privileges
USING btree
(
	created_by
);
-- ddl-end --

-- object: "CTM".turn | type: TABLE --
-- DROP TABLE IF EXISTS "CTM".turn CASCADE;
CREATE TABLE "CTM".turn (
	id serial NOT NULL,
	name varchar(50) NOT NULL,
	document varchar(50) NOT NULL,
	phone_number varchar(20) NOT NULL,
	created_by integer,
	procedure_id integer,
	CONSTRAINT turn_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "CTM".turn OWNER TO root;
-- ddl-end --

-- object: turn_created_by_idx | type: INDEX --
-- DROP INDEX IF EXISTS "CTM".turn_created_by_idx CASCADE;
CREATE INDEX turn_created_by_idx ON "CTM".turn
USING btree
(
	created_by
);
-- ddl-end --

-- object: "SVC".procedure | type: TABLE --
-- DROP TABLE IF EXISTS "SVC".procedure CASCADE;
CREATE TABLE "SVC".procedure (
	id serial NOT NULL,
	name varchar(50) NOT NULL,
	description text,
	created_at timestamp DEFAULT now(),
	status boolean NOT NULL,
	created_by integer,
	parent boolean,
	CONSTRAINT procedure_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "SVC".procedure OWNER TO root;
-- ddl-end --

-- object: procedure_created_by_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVC".procedure_created_by_idx CASCADE;
CREATE INDEX procedure_created_by_idx ON "SVC".procedure
USING btree
(
	created_by
);
-- ddl-end --

-- object: "SVC".procedure_procedure | type: TABLE --
-- DROP TABLE IF EXISTS "SVC".procedure_procedure CASCADE;
CREATE TABLE "SVC".procedure_procedure (
	id serial,
	procedure_id_parent integer,
	procedure_id_children integer

);
-- ddl-end --
ALTER TABLE "SVC".procedure_procedure OWNER TO root;
-- ddl-end --

-- object: procedure_procedure_id_parent_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVC".procedure_procedure_id_parent_idx CASCADE;
CREATE INDEX procedure_procedure_id_parent_idx ON "SVC".procedure_procedure
USING btree
(
	procedure_id_parent
);
-- ddl-end --

-- object: procedure_procedure_id_children | type: INDEX --
-- DROP INDEX IF EXISTS "SVC".procedure_procedure_id_children CASCADE;
CREATE INDEX procedure_procedure_id_children ON "SVC".procedure_procedure
USING btree
(
	procedure_id_children
);
-- ddl-end --

-- object: turn_procedure_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "CTM".turn_procedure_id_idx CASCADE;
CREATE INDEX turn_procedure_id_idx ON "CTM".turn
USING btree
(
	procedure_id
);
-- ddl-end --

-- object: "CTM".attention | type: TABLE --
-- DROP TABLE IF EXISTS "CTM".attention CASCADE;
CREATE TABLE "CTM".attention (
	id serial NOT NULL,
	turn_id integer,
	attent_by integer,
	procedure_id integer,
	created_at timestamp DEFAULT now(),
	CONSTRAINT attention_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "CTM".attention OWNER TO root;
-- ddl-end --

-- object: created_by | type: COLUMN --
-- ALTER TABLE "USR".rol DROP COLUMN IF EXISTS created_by CASCADE;
-- ALTER TABLE "USR".rol ADD COLUMN created_by integer;
-- ddl-end --


-- object: attention_turn_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "CTM".attention_turn_id_idx CASCADE;
CREATE INDEX attention_turn_id_idx ON "CTM".attention
USING btree
(
	turn_id
);
-- ddl-end --

-- object: attention_attent_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "CTM".attention_attent_id_idx CASCADE;
CREATE INDEX attention_attent_id_idx ON "CTM".attention
USING btree
(
	attent_by
);
-- ddl-end --

-- object: attention_procedure_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "CTM".attention_procedure_id_idx CASCADE;
CREATE INDEX attention_procedure_id_idx ON "CTM".attention
USING btree
(
	procedure_id
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
-- ddl-end --


-- [ Created foreign keys ] --
-- object: user_permissions_fk | type: CONSTRAINT --
-- ALTER TABLE "USR".permissions DROP CONSTRAINT IF EXISTS user_permissions_fk CASCADE;
ALTER TABLE "USR".permissions ADD CONSTRAINT user_permissions_fk FOREIGN KEY (created_by)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_rol_fk | type: CONSTRAINT --
-- ALTER TABLE "USR".rol DROP CONSTRAINT IF EXISTS user_rol_fk CASCADE;
ALTER TABLE "USR".rol ADD CONSTRAINT user_rol_fk FOREIGN KEY (created_by)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: rol_rol_privileges_fk | type: CONSTRAINT --
-- ALTER TABLE "USR".rol_privileges DROP CONSTRAINT IF EXISTS rol_rol_privileges_fk CASCADE;
ALTER TABLE "USR".rol_privileges ADD CONSTRAINT rol_rol_privileges_fk FOREIGN KEY (rol_id)
REFERENCES "USR".rol (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: privileges_rol_privileges_fk | type: CONSTRAINT --
-- ALTER TABLE "USR".rol_privileges DROP CONSTRAINT IF EXISTS privileges_rol_privileges_fk CASCADE;
ALTER TABLE "USR".rol_privileges ADD CONSTRAINT privileges_rol_privileges_fk FOREIGN KEY (privileges_id)
REFERENCES "USR".privileges (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: permissions_permissions_privileges_fk | type: CONSTRAINT --
-- ALTER TABLE "USR".permissions_privileges DROP CONSTRAINT IF EXISTS permissions_permissions_privileges_fk CASCADE;
ALTER TABLE "USR".permissions_privileges ADD CONSTRAINT permissions_permissions_privileges_fk FOREIGN KEY (permissions_id)
REFERENCES "USR".permissions (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: privileges_permissions_privileges_fk | type: CONSTRAINT --
-- ALTER TABLE "USR".permissions_privileges DROP CONSTRAINT IF EXISTS privileges_permissions_privileges_fk CASCADE;
ALTER TABLE "USR".permissions_privileges ADD CONSTRAINT privileges_permissions_privileges_fk FOREIGN KEY (privileges_id)
REFERENCES "USR".privileges (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_privileges_fk | type: CONSTRAINT --
-- ALTER TABLE "USR".privileges DROP CONSTRAINT IF EXISTS user_privileges_fk CASCADE;
ALTER TABLE "USR".privileges ADD CONSTRAINT user_privileges_fk FOREIGN KEY (created_by)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_turn_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".turn DROP CONSTRAINT IF EXISTS user_turn_fk CASCADE;
ALTER TABLE "CTM".turn ADD CONSTRAINT user_turn_fk FOREIGN KEY (created_by)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_procedure_fk | type: CONSTRAINT --
-- ALTER TABLE "SVC".procedure DROP CONSTRAINT IF EXISTS user_procedure_fk CASCADE;
ALTER TABLE "SVC".procedure ADD CONSTRAINT user_procedure_fk FOREIGN KEY (created_by)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: procedure_procedure_procedure_fk | type: CONSTRAINT --
-- ALTER TABLE "SVC".procedure_procedure DROP CONSTRAINT IF EXISTS procedure_procedure_procedure_fk CASCADE;
ALTER TABLE "SVC".procedure_procedure ADD CONSTRAINT procedure_procedure_procedure_fk FOREIGN KEY (procedure_id_parent)
REFERENCES "SVC".procedure (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: procedure_procedure_procedure_fk1 | type: CONSTRAINT --
-- ALTER TABLE "SVC".procedure_procedure DROP CONSTRAINT IF EXISTS procedure_procedure_procedure_fk1 CASCADE;
ALTER TABLE "SVC".procedure_procedure ADD CONSTRAINT procedure_procedure_procedure_fk1 FOREIGN KEY (procedure_id_children)
REFERENCES "SVC".procedure (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: procedure_turn_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".turn DROP CONSTRAINT IF EXISTS procedure_turn_fk CASCADE;
ALTER TABLE "CTM".turn ADD CONSTRAINT procedure_turn_fk FOREIGN KEY (procedure_id)
REFERENCES "SVC".procedure (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: turn_attention_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".attention DROP CONSTRAINT IF EXISTS turn_attention_fk CASCADE;
ALTER TABLE "CTM".attention ADD CONSTRAINT turn_attention_fk FOREIGN KEY (turn_id)
REFERENCES "CTM".turn (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_attention_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".attention DROP CONSTRAINT IF EXISTS user_attention_fk CASCADE;
ALTER TABLE "CTM".attention ADD CONSTRAINT user_attention_fk FOREIGN KEY (attent_by)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: procedure_attention_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".attention DROP CONSTRAINT IF EXISTS procedure_attention_fk CASCADE;
ALTER TABLE "CTM".attention ADD CONSTRAINT procedure_attention_fk FOREIGN KEY (procedure_id)
REFERENCES "SVC".procedure (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- [ Created foreign keys ] --
-- object: user_permissions_fk | type: CONSTRAINT --
-- ALTER TABLE "USR".permissions DROP CONSTRAINT IF EXISTS user_permissions_fk CASCADE;
ALTER TABLE "USR".permissions ADD CONSTRAINT user_permissions_fk FOREIGN KEY (created_by)
    REFERENCES "USR"."user" (id) MATCH FULL
    ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_rol_fk | type: CONSTRAINT --
-- ALTER TABLE "USR".rol DROP CONSTRAINT IF EXISTS user_rol_fk CASCADE;
ALTER TABLE "USR".rol ADD CONSTRAINT user_rol_fk FOREIGN KEY (created_by)
    REFERENCES "USR"."user" (id) MATCH FULL
    ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: rol_rol_privileges_fk | type: CONSTRAINT --
-- ALTER TABLE "USR".rol_privileges DROP CONSTRAINT IF EXISTS rol_rol_privileges_fk CASCADE;
ALTER TABLE "USR".rol_privileges ADD CONSTRAINT rol_rol_privileges_fk FOREIGN KEY (rol_id)
    REFERENCES "USR".rol (id) MATCH FULL
    ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: privileges_rol_privileges_fk | type: CONSTRAINT --
-- ALTER TABLE "USR".rol_privileges DROP CONSTRAINT IF EXISTS privileges_rol_privileges_fk CASCADE;
ALTER TABLE "USR".rol_privileges ADD CONSTRAINT privileges_rol_privileges_fk FOREIGN KEY (privileges_id)
    REFERENCES "USR".privileges (id) MATCH FULL
    ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: permissions_permissions_privileges_fk | type: CONSTRAINT --
-- ALTER TABLE "USR".permissions_privileges DROP CONSTRAINT IF EXISTS permissions_permissions_privileges_fk CASCADE;
ALTER TABLE "USR".permissions_privileges ADD CONSTRAINT permissions_permissions_privileges_fk FOREIGN KEY (permissions_id)
    REFERENCES "USR".permissions (id) MATCH FULL
    ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: privileges_permissions_privileges_fk | type: CONSTRAINT --
-- ALTER TABLE "USR".permissions_privileges DROP CONSTRAINT IF EXISTS privileges_permissions_privileges_fk CASCADE;
ALTER TABLE "USR".permissions_privileges ADD CONSTRAINT privileges_permissions_privileges_fk FOREIGN KEY (privileges_id)
    REFERENCES "USR".privileges (id) MATCH FULL
    ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_privileges_fk | type: CONSTRAINT --
-- ALTER TABLE "USR".privileges DROP CONSTRAINT IF EXISTS user_privileges_fk CASCADE;
ALTER TABLE "USR".privileges ADD CONSTRAINT user_privileges_fk FOREIGN KEY (created_by)
    REFERENCES "USR"."user" (id) MATCH FULL
    ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_turn_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".turn DROP CONSTRAINT IF EXISTS user_turn_fk CASCADE;
ALTER TABLE "CTM".turn ADD CONSTRAINT user_turn_fk FOREIGN KEY (created_by)
    REFERENCES "USR"."user" (id) MATCH FULL
    ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_procedure_fk | type: CONSTRAINT --
-- ALTER TABLE "SVC".procedure DROP CONSTRAINT IF EXISTS user_procedure_fk CASCADE;
ALTER TABLE "SVC".procedure ADD CONSTRAINT user_procedure_fk FOREIGN KEY (created_by)
    REFERENCES "USR"."user" (id) MATCH FULL
    ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: procedure_procedure_procedure_fk | type: CONSTRAINT --
-- ALTER TABLE "SVC".procedure_procedure DROP CONSTRAINT IF EXISTS procedure_procedure_procedure_fk CASCADE;
ALTER TABLE "SVC".procedure_procedure ADD CONSTRAINT procedure_procedure_procedure_fk FOREIGN KEY (procedure_id_parent)
    REFERENCES "SVC".procedure (id) MATCH FULL
    ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: procedure_procedure_procedure_fk1 | type: CONSTRAINT --
-- ALTER TABLE "SVC".procedure_procedure DROP CONSTRAINT IF EXISTS procedure_procedure_procedure_fk1 CASCADE;
ALTER TABLE "SVC".procedure_procedure ADD CONSTRAINT procedure_procedure_procedure_fk1 FOREIGN KEY (procedure_id_children)
    REFERENCES "SVC".procedure (id) MATCH FULL
    ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: procedure_turn_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".turn DROP CONSTRAINT IF EXISTS procedure_turn_fk CASCADE;
ALTER TABLE "CTM".turn ADD CONSTRAINT procedure_turn_fk FOREIGN KEY (procedure_id)
    REFERENCES "SVC".procedure (id) MATCH FULL
    ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: turn_attention_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".attention DROP CONSTRAINT IF EXISTS turn_attention_fk CASCADE;
ALTER TABLE "CTM".attention ADD CONSTRAINT turn_attention_fk FOREIGN KEY (turn_id)
    REFERENCES "CTM".turn (id) MATCH FULL
    ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_attention_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".attention DROP CONSTRAINT IF EXISTS user_attention_fk CASCADE;
ALTER TABLE "CTM".attention ADD CONSTRAINT user_attention_fk FOREIGN KEY (attent_by)
    REFERENCES "USR"."user" (id) MATCH FULL
    ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: procedure_attention_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".attention DROP CONSTRAINT IF EXISTS procedure_attention_fk CASCADE;
ALTER TABLE "CTM".attention ADD CONSTRAINT procedure_attention_fk FOREIGN KEY (procedure_id)
    REFERENCES "SVC".procedure (id) MATCH FULL
    ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --


