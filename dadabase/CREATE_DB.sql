-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 1.0.0-alpha1
-- PostgreSQL version: 14.0
-- Project Site: pgmodeler.io
-- Model Author: ---
-- object: root | type: ROLE --
-- DROP ROLE IF EXISTS root;
CREATE ROLE root WITH 
	UNENCRYPTED PASSWORD 'Id70pP%2C!3S';
-- ddl-end --


-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: sistem_inventory | type: DATABASE --
-- DROP DATABASE IF EXISTS sistem_inventory;
CREATE DATABASE sistem_inventory
	OWNER = root;
-- ddl-end --


-- object: "INV" | type: SCHEMA --
-- DROP SCHEMA IF EXISTS "INV" CASCADE;
CREATE SCHEMA "INV";
-- ddl-end --
ALTER SCHEMA "INV" OWNER TO root;
-- ddl-end --

-- object: "SVC" | type: SCHEMA --
-- DROP SCHEMA IF EXISTS "SVC" CASCADE;
CREATE SCHEMA "SVC";
-- ddl-end --
ALTER SCHEMA "SVC" OWNER TO root;
-- ddl-end --

-- object: "APMT" | type: SCHEMA --
-- DROP SCHEMA IF EXISTS "APMT" CASCADE;
CREATE SCHEMA "APMT";
-- ddl-end --
ALTER SCHEMA "APMT" OWNER TO root;
-- ddl-end --

-- object: "CTM" | type: SCHEMA --
-- DROP SCHEMA IF EXISTS "CTM" CASCADE;
CREATE SCHEMA "CTM";
-- ddl-end --
ALTER SCHEMA "CTM" OWNER TO root;
-- ddl-end --

-- object: "USR" | type: SCHEMA --
-- DROP SCHEMA IF EXISTS "USR" CASCADE;
CREATE SCHEMA "USR";
-- ddl-end --
ALTER SCHEMA "USR" OWNER TO root;
-- ddl-end --

SET search_path TO pg_catalog,public,"INV","SVC","APMT","CTM","USR";
-- ddl-end --

-- object: "INV"."Inventory" | type: TABLE --
-- DROP TABLE IF EXISTS "INV"."Inventory" CASCADE;
CREATE TABLE "INV"."Inventory" (
	id serial NOT NULL,
	name text NOT NULL,
	description text,
	quantity integer NOT NULL,
	status text NOT NULL,
	created_at timestamp DEFAULT now(),
	CONSTRAINT "Inventory_pk" PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "INV"."Inventory" OWNER TO root;
-- ddl-end --

-- object: "INV".inventory_in_out | type: TABLE --
-- DROP TABLE IF EXISTS "INV".inventory_in_out CASCADE;
CREATE TABLE "INV".inventory_in_out (
	id serial NOT NULL,
	quantity integer NOT NULL,
	type char(1) NOT NULL,
	"Inventory_id" integer,
	service_id integer,
	CONSTRAINT inventory_in_out_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "INV".inventory_in_out OWNER TO root;
-- ddl-end --

-- object: "Inventory_inventory_in_out_fk" | type: CONSTRAINT --
-- ALTER TABLE "INV".inventory_in_out DROP CONSTRAINT IF EXISTS "Inventory_inventory_in_out_fk" CASCADE;
ALTER TABLE "INV".inventory_in_out ADD CONSTRAINT "Inventory_inventory_in_out_fk" FOREIGN KEY ("Inventory_id")
REFERENCES "INV"."Inventory" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: inventory_in_out_inventory_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "INV".inventory_in_out_inventory_id_idx CASCADE;
CREATE INDEX inventory_in_out_inventory_id_idx ON "INV".inventory_in_out
USING btree
(
	"Inventory_id"
);
-- ddl-end --

-- object: "SVC".service | type: TABLE --
-- DROP TABLE IF EXISTS "SVC".service CASCADE;
CREATE TABLE "SVC".service (
	id serial NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	amount money NOT NULL,
	status text NOT NULL DEFAULT 'completed',
	appointment_id integer,
	customer_id integer,
	user_id integer,
	description text NOT NULL,
	CONSTRAINT service_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "SVC".service OWNER TO root;
-- ddl-end --

-- object: service_inventory_in_out_fk | type: CONSTRAINT --
-- ALTER TABLE "INV".inventory_in_out DROP CONSTRAINT IF EXISTS service_inventory_in_out_fk CASCADE;
ALTER TABLE "INV".inventory_in_out ADD CONSTRAINT service_inventory_in_out_fk FOREIGN KEY (service_id)
REFERENCES "SVC".service (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: inventory_in_out_service_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "INV".inventory_in_out_service_id_idx CASCADE;
CREATE INDEX inventory_in_out_service_id_idx ON "INV".inventory_in_out
USING btree
(
	service_id
);
-- ddl-end --

-- object: "APMT".appointment | type: TABLE --
-- DROP TABLE IF EXISTS "APMT".appointment CASCADE;
CREATE TABLE "APMT".appointment (
	id serial NOT NULL,
	date timestamp NOT NULL,
	duration integer NOT NULL,
	craeted_at timestamp DEFAULT now(),
	customer_id integer,
	user_id integer,
	CONSTRAINT appointment_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "APMT".appointment OWNER TO root;
-- ddl-end --

-- object: appointment_service_fk | type: CONSTRAINT --
-- ALTER TABLE "SVC".service DROP CONSTRAINT IF EXISTS appointment_service_fk CASCADE;
ALTER TABLE "SVC".service ADD CONSTRAINT appointment_service_fk FOREIGN KEY (appointment_id)
REFERENCES "APMT".appointment (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: service_uq | type: CONSTRAINT --
-- ALTER TABLE "SVC".service DROP CONSTRAINT IF EXISTS service_uq CASCADE;
ALTER TABLE "SVC".service ADD CONSTRAINT service_uq UNIQUE (appointment_id);
-- ddl-end --

-- object: "CTM".customer | type: TABLE --
-- DROP TABLE IF EXISTS "CTM".customer CASCADE;
CREATE TABLE "CTM".customer (
	id serial NOT NULL,
	name text NOT NULL,
	document text,
	document_type text,
	address text,
	phone_number text NOT NULL,
	status text NOT NULL DEFAULT 'active',
	created_at timestamp DEFAULT now(),
	CONSTRAINT customer_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "CTM".customer OWNER TO root;
-- ddl-end --

-- object: customer_service_fk | type: CONSTRAINT --
-- ALTER TABLE "SVC".service DROP CONSTRAINT IF EXISTS customer_service_fk CASCADE;
ALTER TABLE "SVC".service ADD CONSTRAINT customer_service_fk FOREIGN KEY (customer_id)
REFERENCES "CTM".customer (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: service_id_appointment_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVC".service_id_appointment_id_idx CASCADE;
CREATE INDEX service_id_appointment_id_idx ON "SVC".service
USING btree
(
	appointment_id
);
-- ddl-end --

-- object: service_id_customer_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVC".service_id_customer_id_idx CASCADE;
CREATE INDEX service_id_customer_id_idx ON "SVC".service
USING btree
(
	customer_id
);
-- ddl-end --

-- object: customer_appointment_fk | type: CONSTRAINT --
-- ALTER TABLE "APMT".appointment DROP CONSTRAINT IF EXISTS customer_appointment_fk CASCADE;
ALTER TABLE "APMT".appointment ADD CONSTRAINT customer_appointment_fk FOREIGN KEY (customer_id)
REFERENCES "CTM".customer (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: appointment_id_customer_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "APMT".appointment_id_customer_id_idx CASCADE;
CREATE INDEX appointment_id_customer_id_idx ON "APMT".appointment
USING btree
(
	customer_id
);
-- ddl-end --

-- object: "USR"."user" | type: TABLE --
-- DROP TABLE IF EXISTS "USR"."user" CASCADE;
CREATE TABLE "USR"."user" (
	id serial NOT NULL,
	first_name text NOT NULL,
	last_name text NOT NULL,
	address text NOT NULL,
	phone_number text NOT NULL,
	email text,
	document_type varchar(2) NOT NULL DEFAULT 'CC',
	document_number text NOT NULL,
	status text DEFAULT 'active',
	created_at timestamp DEFAULT now(),
	rol_id integer,
	CONSTRAINT user_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "USR"."user" OWNER TO root;
-- ddl-end --

-- object: user_service_fk | type: CONSTRAINT --
-- ALTER TABLE "SVC".service DROP CONSTRAINT IF EXISTS user_service_fk CASCADE;
ALTER TABLE "SVC".service ADD CONSTRAINT user_service_fk FOREIGN KEY (user_id)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: service_user_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVC".service_user_id_idx CASCADE;
CREATE INDEX service_user_id_idx ON "SVC".service
USING btree
(
	user_id
);
-- ddl-end --

-- object: user_appointment_fk | type: CONSTRAINT --
-- ALTER TABLE "APMT".appointment DROP CONSTRAINT IF EXISTS user_appointment_fk CASCADE;
ALTER TABLE "APMT".appointment ADD CONSTRAINT user_appointment_fk FOREIGN KEY (user_id)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: appointmet_user_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "APMT".appointmet_user_id_idx CASCADE;
CREATE INDEX appointmet_user_id_idx ON "APMT".appointment
USING btree
(
	user_id
);
-- ddl-end --

-- object: "CTM".customer_history | type: TABLE --
-- DROP TABLE IF EXISTS "CTM".customer_history CASCADE;
CREATE TABLE "CTM".customer_history (
	id serial NOT NULL,
	created_at timestamp DEFAULT now(),
	service_id integer,
	CONSTRAINT customer_history_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "CTM".customer_history OWNER TO root;
-- ddl-end --

-- object: service_customer_history_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".customer_history DROP CONSTRAINT IF EXISTS service_customer_history_fk CASCADE;
ALTER TABLE "CTM".customer_history ADD CONSTRAINT service_customer_history_fk FOREIGN KEY (service_id)
REFERENCES "SVC".service (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: customer_history_uq | type: CONSTRAINT --
-- ALTER TABLE "CTM".customer_history DROP CONSTRAINT IF EXISTS customer_history_uq CASCADE;
ALTER TABLE "CTM".customer_history ADD CONSTRAINT customer_history_uq UNIQUE (service_id);
-- ddl-end --

-- object: "USR".rol | type: TABLE --
-- DROP TABLE IF EXISTS "USR".rol CASCADE;
CREATE TABLE "USR".rol (
	id serial NOT NULL,
	name text NOT NULL,
	description text,
	status boolean NOT NULL DEFAULT true,
	created_at timestamp DEFAULT now(),
	CONSTRAINT rol_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "USR".rol OWNER TO root;
-- ddl-end --

-- object: rol_user_fk | type: CONSTRAINT --
-- ALTER TABLE "USR"."user" DROP CONSTRAINT IF EXISTS rol_user_fk CASCADE;
ALTER TABLE "USR"."user" ADD CONSTRAINT rol_user_fk FOREIGN KEY (rol_id)
REFERENCES "USR".rol (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_rol_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "USR".user_rol_id_idx CASCADE;
CREATE INDEX user_rol_id_idx ON "USR"."user"
USING btree
(
	rol_id
);
-- ddl-end --

-- object: "INV".expense | type: TABLE --
-- DROP TABLE IF EXISTS "INV".expense CASCADE;
CREATE TABLE "INV".expense (
	id serial NOT NULL,
	name text NOT NULL,
	description text,
	amount integer NOT NULL,
	created_at timestamp DEFAULT now(),
	user_id integer,
	CONSTRAINT expense_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "INV".expense OWNER TO root;
-- ddl-end --

-- object: user_expense_fk | type: CONSTRAINT --
-- ALTER TABLE "INV".expense DROP CONSTRAINT IF EXISTS user_expense_fk CASCADE;
ALTER TABLE "INV".expense ADD CONSTRAINT user_expense_fk FOREIGN KEY (user_id)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: expense_user_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "INV".expense_user_id_idx CASCADE;
CREATE INDEX expense_user_id_idx ON "INV".expense
USING btree
(
	user_id
);
-- ddl-end --


