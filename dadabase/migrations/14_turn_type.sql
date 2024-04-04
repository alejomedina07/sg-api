-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2024-03-18 18:51:22
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 12
-- Created objects: 15
-- Changed objects: 2

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG","SVY","PVD";
-- ddl-end --


-- [ Dropped objects ] --
ALTER TABLE "CTM".attention DROP CONSTRAINT IF EXISTS procedure_attention_fk CASCADE;
-- ddl-end --
ALTER TABLE "CTM".turn DROP CONSTRAINT IF EXISTS procedure_turn_fk CASCADE;
-- ddl-end --
ALTER TABLE "SVC".procedure_procedure DROP CONSTRAINT IF EXISTS procedure_procedure_procedure_fk1 CASCADE;
-- ddl-end --
ALTER TABLE "SVC".procedure_procedure DROP CONSTRAINT IF EXISTS procedure_procedure_procedure_fk CASCADE;
-- ddl-end --
ALTER TABLE "SVC".procedure DROP CONSTRAINT IF EXISTS user_procedure_fk CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS "SVC".procedure_procedure_id_children CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS "SVC".procedure_procedure_id_parent_idx CASCADE;
-- ddl-end --
DROP TABLE IF EXISTS "SVC".procedure_procedure CASCADE;
-- ddl-end --
DROP SEQUENCE IF EXISTS "SVC".procedure_procedure_id_seq CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS "SVC".procedure_created_by_idx CASCADE;
-- ddl-end --
DROP TABLE IF EXISTS "SVC".procedure CASCADE;
-- ddl-end --
DROP SEQUENCE IF EXISTS "SVC".procedure_id_seq CASCADE;
-- ddl-end --
ALTER TABLE "CTM".turn DROP COLUMN IF EXISTS procedure_id CASCADE;
-- ddl-end --
ALTER TABLE "CTM".attention DROP COLUMN IF EXISTS procedure_id CASCADE;
-- ddl-end --


-- [ Created objects ] --
-- object: "CTM".type_turn | type: TABLE --
-- DROP TABLE IF EXISTS "CTM".type_turn CASCADE;
CREATE TABLE "CTM".type_turn (
	id serial NOT NULL,
	name varchar(50) NOT NULL,
	description text,
	created_at timestamp DEFAULT now(),
	status boolean NOT NULL,
	created_by integer,
	CONSTRAINT procedure_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "CTM".type_turn OWNER TO root;
-- ddl-end --

-- object: procedure_created_by_idx | type: INDEX --
-- DROP INDEX IF EXISTS "CTM".procedure_created_by_idx CASCADE;
CREATE INDEX procedure_created_by_idx ON "CTM".type_turn
USING btree
(
	created_by
);
-- ddl-end --

-- object: type_turn_id | type: COLUMN --
-- ALTER TABLE "CTM".turn DROP COLUMN IF EXISTS type_turn_id CASCADE;
ALTER TABLE "CTM".turn ADD COLUMN type_turn_id integer;
-- ddl-end --


-- object: type_turn_id | type: COLUMN --
-- ALTER TABLE "CTM".attention DROP COLUMN IF EXISTS type_turn_id CASCADE;
ALTER TABLE "CTM".attention ADD COLUMN type_turn_id integer;
-- ddl-end --


-- object: company | type: COLUMN --
-- ALTER TABLE "CTM".turn DROP COLUMN IF EXISTS company CASCADE;
ALTER TABLE "CTM".turn ADD COLUMN company varchar(200);
-- ddl-end --


-- object: document | type: COLUMN --
-- ALTER TABLE "CTM".turn DROP COLUMN IF EXISTS document CASCADE;
ALTER TABLE "CTM".turn ADD COLUMN document varchar(20);
-- ddl-end --


-- object: created_at | type: COLUMN --
-- ALTER TABLE "CTM".turn DROP COLUMN IF EXISTS created_at CASCADE;
ALTER TABLE "CTM".turn ADD COLUMN created_at timestamp DEFAULT now();
-- ddl-end --


-- object: finish_at | type: COLUMN --
-- ALTER TABLE "CTM".turn DROP COLUMN IF EXISTS finish_at CASCADE;
ALTER TABLE "CTM".turn ADD COLUMN finish_at timestamp;
-- ddl-end --


-- object: total_time | type: COLUMN --
-- ALTER TABLE "CTM".turn DROP COLUMN IF EXISTS total_time CASCADE;
ALTER TABLE "CTM".turn ADD COLUMN total_time interval;
-- ddl-end --


-- object: finish_at | type: COLUMN --
-- ALTER TABLE "CTM".attention DROP COLUMN IF EXISTS finish_at CASCADE;
ALTER TABLE "CTM".attention ADD COLUMN finish_at timestamp;
-- ddl-end --


-- object: total_time | type: COLUMN --
-- ALTER TABLE "CTM".attention DROP COLUMN IF EXISTS total_time CASCADE;
ALTER TABLE "CTM".attention ADD COLUMN total_time interval;
-- ddl-end --


-- object: description | type: COLUMN --
-- ALTER TABLE "CTM".attention DROP COLUMN IF EXISTS description CASCADE;
ALTER TABLE "CTM".attention ADD COLUMN description text;
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
ALTER TABLE "CTM".turn ALTER COLUMN full_name TYPE varchar(200);
-- ddl-end --


-- [ Created foreign keys ] --
-- object: user_type_turn_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".type_turn DROP CONSTRAINT IF EXISTS user_type_turn_fk CASCADE;
ALTER TABLE "CTM".type_turn ADD CONSTRAINT user_type_turn_fk FOREIGN KEY (created_by)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: type_turn_turn_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".turn DROP CONSTRAINT IF EXISTS type_turn_turn_fk CASCADE;
ALTER TABLE "CTM".turn ADD CONSTRAINT type_turn_turn_fk FOREIGN KEY (type_turn_id)
REFERENCES "CTM".type_turn (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: type_turn_attention_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".attention DROP CONSTRAINT IF EXISTS type_turn_attention_fk CASCADE;
ALTER TABLE "CTM".attention ADD CONSTRAINT type_turn_attention_fk FOREIGN KEY (type_turn_id)
REFERENCES "CTM".type_turn (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

