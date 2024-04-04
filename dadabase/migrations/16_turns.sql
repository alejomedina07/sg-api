-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2024-04-02 14:27:18
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 0
-- Created objects: 8
-- Changed objects: 1

-- SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG","SVY","PVD";
-- ddl-end --


-- [ Dropped objects ] --
-- ALTER TABLE "CTM".turn DROP COLUMN IF EXISTS is_finish CASCADE;
-- ddl-end --


-- [ Created objects ] --
-- object: turn_created_by_idx | type: INDEX --
-- -- DROP INDEX IF EXISTS "CTM".turn_created_by_idx CASCADE;
-- CREATE INDEX turn_created_by_idx ON "CTM".turn
-- USING btree
-- (
-- 	created_by_id
-- );
-- ddl-end --

-- object: turn_procedure_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "CTM".turn_procedure_id_idx CASCADE;
-- CREATE INDEX turn_procedure_id_idx ON "CTM".turn
-- USING btree
-- (
-- 	type_turn_id
-- );
-- ddl-end --

-- object: attention_attent_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "CTM".attention_attent_id_idx CASCADE;
CREATE INDEX attention_attent_id_idx ON "CTM".attention
USING btree
(
	attent_by_id
);
-- ddl-end --

-- object: time_appointment | type: COLUMN --
-- ALTER TABLE "CTM".turn DROP COLUMN IF EXISTS time_appointment CASCADE;
ALTER TABLE "CTM".turn ADD COLUMN time_appointment varchar(10);
-- ddl-end --


-- object: type_turn_id | type: COLUMN --
-- ALTER TABLE "CTM".turn DROP COLUMN IF EXISTS type_turn_id CASCADE;
ALTER TABLE "CTM".turn ADD COLUMN type_turn_id integer;
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
-- object: user_turn_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".turn DROP CONSTRAINT IF EXISTS user_turn_fk CASCADE;
ALTER TABLE "CTM".turn ADD CONSTRAINT user_turn_fk FOREIGN KEY (created_by_id)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: type_turn_turn_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".turn DROP CONSTRAINT IF EXISTS type_turn_turn_fk CASCADE;
-- ALTER TABLE "CTM".turn ADD CONSTRAINT type_turn_turn_fk FOREIGN KEY (type_turn_id)
-- REFERENCES "CTM".type_turn (id) MATCH FULL
-- ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_attention_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".attention DROP CONSTRAINT IF EXISTS user_attention_fk CASCADE;
ALTER TABLE "CTM".attention ADD CONSTRAINT user_attention_fk FOREIGN KEY (attent_by_id)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

