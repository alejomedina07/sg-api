-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2023-03-27 09:37:24
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 0
-- Created objects: 27
-- Changed objects: 1

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG";
-- ddl-end --


-- object: blood_type | type: COLUMN --
-- ALTER TABLE "USR"."user" DROP COLUMN IF EXISTS blood_type CASCADE;
ALTER TABLE "USR"."user" ADD COLUMN blood_type varchar(10);
-- ddl-end --


-- object: description | type: COLUMN --
-- ALTER TABLE "APMT".appointment DROP COLUMN IF EXISTS description CASCADE;
ALTER TABLE "APMT".appointment ADD COLUMN description text;
-- ddl-end --



-- object: blood_type | type: COLUMN --
-- ALTER TABLE "CTM".customer DROP COLUMN IF EXISTS blood_type CASCADE;
ALTER TABLE "CTM".customer ADD COLUMN blood_type varchar(10);
-- ddl-end --


-- object: created_by | type: COLUMN --
-- ALTER TABLE "SVC".service DROP COLUMN IF EXISTS created_by CASCADE;
ALTER TABLE "SVC".service ADD COLUMN created_by integer;
-- ddl-end --


-- object: created_by | type: COLUMN --
-- ALTER TABLE "APMT".appointment DROP COLUMN IF EXISTS created_by CASCADE;
ALTER TABLE "APMT".appointment ADD COLUMN created_by integer;
-- ddl-end --


-- object: created_by | type: COLUMN --
-- ALTER TABLE "INV".expense DROP COLUMN IF EXISTS created_by CASCADE;
ALTER TABLE "INV".expense ADD COLUMN created_by integer;
-- ddl-end --


-- object: created_by | type: COLUMN --
-- ALTER TABLE "CTM".customer DROP COLUMN IF EXISTS created_by CASCADE;
ALTER TABLE "CTM".customer ADD COLUMN created_by integer;
-- ddl-end --


-- object: created_by | type: COLUMN --
-- ALTER TABLE "INV".inventory_in_out DROP COLUMN IF EXISTS created_by CASCADE;
ALTER TABLE "INV".inventory_in_out ADD COLUMN created_by integer;
-- ddl-end --


-- object: created_by | type: COLUMN --
-- ALTER TABLE "INV"."Inventory" DROP COLUMN IF EXISTS created_by CASCADE;
ALTER TABLE "INV"."Inventory" ADD COLUMN created_by integer;
-- ddl-end --


-- object: status_id | type: COLUMN --
-- ALTER TABLE "SVC".service DROP COLUMN IF EXISTS status_id CASCADE;
ALTER TABLE "SVC".service ADD COLUMN status_id integer;
-- ddl-end --


-- object: status_id | type: COLUMN --
-- ALTER TABLE "CTM".customer DROP COLUMN IF EXISTS status_id CASCADE;
ALTER TABLE "CTM".customer ADD COLUMN status_id integer;
-- ddl-end --


-- object: document_type_id | type: COLUMN --
-- ALTER TABLE "CTM".customer DROP COLUMN IF EXISTS document_type_id CASCADE;
ALTER TABLE "CTM".customer ADD COLUMN document_type_id integer;
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
-- -- ddl-end --




-- [ Created objects ] --
-- object: service_user_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVC".service_user_id_idx CASCADE;
CREATE INDEX service_user_id_idx ON "SVC".service
    USING btree
    (
    created_by
    );
-- ddl-end --

-- object: appointmet_user_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "APMT".appointmet_user_id_idx CASCADE;
CREATE INDEX appointmet_user_id_idx ON "APMT".appointment
    USING btree
    (
    created_by
    );
-- ddl-end --

-- object: expense_user_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "INV".expense_user_id_idx CASCADE;
CREATE INDEX expense_user_id_idx ON "INV".expense
    USING btree
    (
    created_by
    );
-- ddl-end --

-- object: customer_user_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "CTM".customer_user_id_idx CASCADE;
CREATE INDEX customer_user_id_idx ON "CTM".customer
    USING btree
    (
    created_by
    );
-- ddl-end --

-- object: inventory_in_out_user_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "INV".inventory_in_out_user_id_idx CASCADE;
CREATE INDEX inventory_in_out_user_id_idx ON "INV".inventory_in_out
    USING btree
    (
    created_by
    );
-- ddl-end --



-- object: service_list_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVC".service_list_id_idx CASCADE;
CREATE INDEX service_list_id_idx ON "SVC".service
    USING btree
    (
    status_id
    );
-- ddl-end --


-- [ Created foreign keys ] --
-- object: user_service_fk | type: CONSTRAINT --
-- ALTER TABLE "SVC".service DROP CONSTRAINT IF EXISTS user_service_fk CASCADE;
ALTER TABLE "SVC".service ADD CONSTRAINT user_service_fk FOREIGN KEY (created_by)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_appointment_fk | type: CONSTRAINT --
-- ALTER TABLE "APMT".appointment DROP CONSTRAINT IF EXISTS user_appointment_fk CASCADE;
ALTER TABLE "APMT".appointment ADD CONSTRAINT user_appointment_fk FOREIGN KEY (created_by)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_expense_fk | type: CONSTRAINT --
-- ALTER TABLE "INV".expense DROP CONSTRAINT IF EXISTS user_expense_fk CASCADE;
ALTER TABLE "INV".expense ADD CONSTRAINT user_expense_fk FOREIGN KEY (created_by)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_customer_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".customer DROP CONSTRAINT IF EXISTS user_customer_fk CASCADE;
ALTER TABLE "CTM".customer ADD CONSTRAINT user_customer_fk FOREIGN KEY (created_by)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_inventory_in_out_fk | type: CONSTRAINT --
-- ALTER TABLE "INV".inventory_in_out DROP CONSTRAINT IF EXISTS user_inventory_in_out_fk CASCADE;
ALTER TABLE "INV".inventory_in_out ADD CONSTRAINT user_inventory_in_out_fk FOREIGN KEY (created_by)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: "user_Inventory_fk" | type: CONSTRAINT --
-- ALTER TABLE "INV"."Inventory" DROP CONSTRAINT IF EXISTS "user_Inventory_fk" CASCADE;
ALTER TABLE "INV"."Inventory" ADD CONSTRAINT "user_Inventory_fk" FOREIGN KEY (created_by)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: list_service_fk | type: CONSTRAINT --
-- ALTER TABLE "SVC".service DROP CONSTRAINT IF EXISTS list_service_fk CASCADE;
ALTER TABLE "SVC".service ADD CONSTRAINT list_service_fk FOREIGN KEY (status_id)
REFERENCES "CNFG".list (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: list_customer_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".customer DROP CONSTRAINT IF EXISTS list_customer_fk CASCADE;
ALTER TABLE "CTM".customer ADD CONSTRAINT list_customer_fk FOREIGN KEY (status_id)
REFERENCES "CNFG".list (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: list_customer_fk1 | type: CONSTRAINT --
-- ALTER TABLE "CTM".customer DROP CONSTRAINT IF EXISTS list_customer_fk1 CASCADE;
ALTER TABLE "CTM".customer ADD CONSTRAINT list_customer_fk1 FOREIGN KEY (document_type_id)
REFERENCES "CNFG".list (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

