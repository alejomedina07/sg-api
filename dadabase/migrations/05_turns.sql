-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2024-05-06 16:22:16
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 0
-- Created objects: 38
-- Changed objects: 14

-- SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG","SVY","PVD";
-- ddl-end --


-- [ Created objects ] --
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

-- object: turn_created_by_idx | type: INDEX --
-- DROP INDEX IF EXISTS "CTM".turn_created_by_idx CASCADE;
CREATE INDEX turn_created_by_idx ON "CTM".turn
USING btree
(
	created_by_id
);
-- ddl-end --

-- object: "CTM".attention | type: TABLE --
-- DROP TABLE IF EXISTS "CTM".attention CASCADE;
CREATE TABLE "CTM".attention (
	id serial NOT NULL,
	turn_id integer,
	created_at timestamp DEFAULT now(),
	finish_at timestamp,
	type_turn_id integer,
	total_time integer,
	description text,
	attent_by_id integer,
	attended_at timestamp,
	CONSTRAINT attention_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "CTM".attention OWNER TO root;
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
	attent_by_id
);
-- ddl-end --

-- object: attention_procedure_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "CTM".attention_procedure_id_idx CASCADE;
CREATE INDEX attention_procedure_id_idx ON "CTM".attention
USING btree
(
	type_turn_id
);
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

-- object: "USR".rol_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS "USR".rol_id_seq CASCADE;
CREATE SEQUENCE "USR".rol_id_seq
	INCREMENT BY 1
	MINVALUE -2147483648
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE "USR".rol_id_seq OWNER TO root;
-- ddl-end --

-- object: "USR".rol_privileges_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS "USR".rol_privileges_id_seq CASCADE;
CREATE SEQUENCE "USR".rol_privileges_id_seq
	INCREMENT BY 1
	MINVALUE -2147483648
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE "USR".rol_privileges_id_seq OWNER TO root;
-- ddl-end --

-- object: "USR".rol_permissions_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS "USR".rol_permissions_id_seq CASCADE;
CREATE SEQUENCE "USR".rol_permissions_id_seq
	INCREMENT BY 1
	MINVALUE -2147483648
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE "USR".rol_permissions_id_seq OWNER TO root;
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
ALTER TABLE "USR".rol ALTER COLUMN name SET NOT NULL;
-- ddl-end --
ALTER TABLE "USR".rol ALTER COLUMN status SET DEFAULT true;
-- ddl-end --
ALTER TABLE "USR".rol ALTER COLUMN status SET NOT NULL;
-- ddl-end --
ALTER TABLE "USR".rol ALTER COLUMN created_at SET DEFAULT now();
-- ddl-end --
ALTER TABLE "USR".permissions ALTER COLUMN name SET NOT NULL;
-- ddl-end --
ALTER TABLE "USR".permissions ALTER COLUMN created_at SET DEFAULT now();
-- ddl-end --
ALTER TABLE "USR".privileges ALTER COLUMN name SET NOT NULL;
-- ddl-end --
ALTER TABLE "USR".privileges ALTER COLUMN created_at SET DEFAULT now();
-- ddl-end --
ALTER TABLE "CTM".turn ALTER COLUMN full_name SET NOT NULL;
-- ddl-end --
ALTER TABLE "CTM".turn ALTER COLUMN created_at SET DEFAULT now();
-- ddl-end --
ALTER TABLE "CTM".turn ALTER COLUMN is_finish SET DEFAULT false;
-- ddl-end --
ALTER TABLE "USR".rol ALTER COLUMN id TYPE integer;
-- ddl-end --
ALTER TABLE "USR".rol ALTER COLUMN id SET DEFAULT nextval('"USR".rol_id_seq'::regclass);
-- ddl-end --
ALTER TABLE "USR".rol_privileges ALTER COLUMN id TYPE integer;
-- ddl-end --
ALTER TABLE "USR".rol_privileges ALTER COLUMN id SET DEFAULT nextval('"USR".rol_privileges_id_seq'::regclass);
-- ddl-end --
ALTER TABLE "USR".rol_permissions ALTER COLUMN id TYPE integer;
-- ddl-end --
ALTER TABLE "USR".rol_permissions ALTER COLUMN id SET DEFAULT nextval('"USR".rol_permissions_id_seq'::regclass);
-- ddl-end --


-- [ Created constraints ] --
-- object: rol_pk | type: CONSTRAINT --
-- ALTER TABLE "USR".rol DROP CONSTRAINT IF EXISTS rol_pk CASCADE;
ALTER TABLE "USR".rol ADD CONSTRAINT rol_pk PRIMARY KEY (id);
-- ddl-end --

-- object: permissions_pk | type: CONSTRAINT --
-- ALTER TABLE "USR".permissions DROP CONSTRAINT IF EXISTS permissions_pk CASCADE;
ALTER TABLE "USR".permissions ADD CONSTRAINT permissions_pk PRIMARY KEY (id);
-- ddl-end --

-- object: privileges_pk | type: CONSTRAINT --
-- ALTER TABLE "USR".privileges DROP CONSTRAINT IF EXISTS privileges_pk CASCADE;
ALTER TABLE "USR".privileges ADD CONSTRAINT privileges_pk PRIMARY KEY (id);
-- ddl-end --

-- object: rol_privileges_pk | type: CONSTRAINT --
-- ALTER TABLE "USR".rol_privileges DROP CONSTRAINT IF EXISTS rol_privileges_pk CASCADE;
ALTER TABLE "USR".rol_privileges ADD CONSTRAINT rol_privileges_pk PRIMARY KEY (id);
-- ddl-end --

-- object: permissions_privileges_pk | type: CONSTRAINT --
-- ALTER TABLE "USR".permissions_privileges DROP CONSTRAINT IF EXISTS permissions_privileges_pk CASCADE;
ALTER TABLE "USR".permissions_privileges ADD CONSTRAINT permissions_privileges_pk PRIMARY KEY (id);
-- ddl-end --

-- object: turn_pk | type: CONSTRAINT --
-- ALTER TABLE "CTM".turn DROP CONSTRAINT IF EXISTS turn_pk CASCADE;
ALTER TABLE "CTM".turn ADD CONSTRAINT turn_pk PRIMARY KEY (id);
-- ddl-end --

-- object: rol_permissions_pk | type: CONSTRAINT --
-- ALTER TABLE "USR".rol_permissions DROP CONSTRAINT IF EXISTS rol_permissions_pk CASCADE;
ALTER TABLE "USR".rol_permissions ADD CONSTRAINT rol_permissions_pk PRIMARY KEY (id);
-- ddl-end --



-- [ Created foreign keys ] --
-- object: rol_user_fk | type: CONSTRAINT --
-- ALTER TABLE "USR"."user" DROP CONSTRAINT IF EXISTS rol_user_fk CASCADE;
ALTER TABLE "USR"."user" ADD CONSTRAINT rol_user_fk FOREIGN KEY (rol_id)
REFERENCES "USR".rol (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

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
ALTER TABLE "CTM".turn ADD CONSTRAINT user_turn_fk FOREIGN KEY (created_by_id)
REFERENCES "USR"."user" (id) MATCH FULL
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
ALTER TABLE "CTM".attention ADD CONSTRAINT user_attention_fk FOREIGN KEY (attent_by_id)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: type_turn_attention_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".attention DROP CONSTRAINT IF EXISTS type_turn_attention_fk CASCADE;
ALTER TABLE "CTM".attention ADD CONSTRAINT type_turn_attention_fk FOREIGN KEY (type_turn_id)
REFERENCES "CTM".type_turn (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

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

