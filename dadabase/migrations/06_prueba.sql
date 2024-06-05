-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2024-05-21 08:57:44
-- Source model: system_inventory
-- Database: prueba
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 0
-- Created objects: 151
-- Changed objects: 2

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG","SVY","PVD";
-- ddl-end --


-- [ Created objects ] --
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

-- object: "CNFG" | type: SCHEMA --
-- DROP SCHEMA IF EXISTS "CNFG" CASCADE;
CREATE SCHEMA "CNFG";
-- ddl-end --
ALTER SCHEMA "CNFG" OWNER TO root;
-- ddl-end --

-- object: "SVY" | type: SCHEMA --
-- DROP SCHEMA IF EXISTS "SVY" CASCADE;
CREATE SCHEMA "SVY";
-- ddl-end --
ALTER SCHEMA "SVY" OWNER TO root;
-- ddl-end --

-- object: "PVD" | type: SCHEMA --
-- DROP SCHEMA IF EXISTS "PVD" CASCADE;
CREATE SCHEMA "PVD";
-- ddl-end --
ALTER SCHEMA "PVD" OWNER TO root;
-- ddl-end --

-- object: "INV"."Inventory" | type: TABLE --
-- DROP TABLE IF EXISTS "INV"."Inventory" CASCADE;
CREATE TABLE "INV"."Inventory" (
	id serial NOT NULL,
	name text NOT NULL,
	description text,
	quantity integer NOT NULL DEFAULT 0,
	created_at timestamp DEFAULT now(),
	created_by integer,
	status_id integer,
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
	increment boolean NOT NULL,
	"Inventory_id" integer,
	service_id integer,
	created_by integer,
	created_at timestamp DEFAULT now(),
	note text,
	CONSTRAINT inventory_in_out_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "INV".inventory_in_out OWNER TO root;
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
	appointment_id integer,
	customer_id integer,
	description text NOT NULL,
	created_by integer,
	status_id integer,
	type_id integer,
	CONSTRAINT service_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "SVC".service OWNER TO root;
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
	created_at timestamp DEFAULT now(),
	customer_id integer,
	created_by integer,
	description text,
	name text NOT NULL,
	appointment_type_id integer,
	assigned_to_id integer,
	CONSTRAINT appointment_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "APMT".appointment OWNER TO root;
-- ddl-end --

-- object: "CTM".customer | type: TABLE --
-- DROP TABLE IF EXISTS "CTM".customer CASCADE;
CREATE TABLE "CTM".customer (
	id serial NOT NULL,
	name text NOT NULL,
	document text,
	address text,
	phone_number text NOT NULL,
	created_at timestamp DEFAULT now(),
	created_by integer,
	blood_type varchar(10),
	status_id integer,
	document_type_id integer,
	birth_date timestamp,
	description text,
	CONSTRAINT customer_pk PRIMARY KEY (id),
	CONSTRAINT document_unique UNIQUE (document)
);
-- ddl-end --
ALTER TABLE "CTM".customer OWNER TO root;
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
	document_number text NOT NULL,
	created_at timestamp DEFAULT now(),
	rol_id integer,
	password text,
	document_type_id integer,
	status_id integer,
	blood_type varchar(10),
	CONSTRAINT user_pk PRIMARY KEY (id),
	CONSTRAINT document_number_unique UNIQUE (document_number),
	CONSTRAINT email_unique UNIQUE (email),
	CONSTRAINT phone_unique UNIQUE (phone_number)
);
-- ddl-end --
ALTER TABLE "USR"."user" OWNER TO root;
-- ddl-end --

-- object: service_user_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVC".service_user_id_idx CASCADE;
CREATE INDEX service_user_id_idx ON "SVC".service
USING btree
(
	created_by
);
-- ddl-end --

-- object: appointment_user_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "APMT".appointment_user_id_idx CASCADE;
CREATE INDEX appointment_user_id_idx ON "APMT".appointment
USING btree
(
	created_by
);
-- ddl-end --

-- object: "USR".rol | type: TABLE --
-- DROP TABLE IF EXISTS "USR".rol CASCADE;
CREATE TABLE "USR".rol (
	id serial NOT NULL,
	name text NOT NULL,
	description text,
	status boolean NOT NULL DEFAULT true,
	created_at timestamp DEFAULT now(),
	created_by integer,
	CONSTRAINT rol_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "USR".rol OWNER TO root;
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
	created_at timestamp DEFAULT now(),
	amount money NOT NULL,
	created_by integer,
	type_id integer,
	CONSTRAINT expense_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "INV".expense OWNER TO root;
-- ddl-end --

-- object: expense_user_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "INV".expense_user_id_idx CASCADE;
CREATE INDEX expense_user_id_idx ON "INV".expense
USING btree
(
	created_by
);
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
	"default" boolean,
	CONSTRAINT "List_pk" PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "CNFG".list OWNER TO root;
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

-- object: "APMT".appointment_type | type: TABLE --
-- DROP TABLE IF EXISTS "APMT".appointment_type CASCADE;
CREATE TABLE "APMT".appointment_type (
	id serial NOT NULL,
	name text NOT NULL,
	description text,
	created_at timestamp DEFAULT now(),
	status boolean DEFAULT true,
	background varchar(10),
	CONSTRAINT appointment_type_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "APMT".appointment_type OWNER TO root;
-- ddl-end --

-- object: appointment_appointment_type_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "APMT".appointment_appointment_type_id_idx CASCADE;
CREATE INDEX appointment_appointment_type_id_idx ON "APMT".appointment
USING btree
(
	appointment_type_id
);
-- ddl-end --

-- object: inventory_status_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "INV".inventory_status_id_idx CASCADE;
CREATE INDEX inventory_status_id_idx ON "INV"."Inventory"
USING btree
(
	status_id
);
-- ddl-end --

-- object: inventory_created_by_idx | type: INDEX --
-- DROP INDEX IF EXISTS "INV".inventory_created_by_idx CASCADE;
CREATE INDEX inventory_created_by_idx ON "INV"."Inventory"
USING btree
(
	created_by
);
-- ddl-end --

-- object: expense_type_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "INV".expense_type_id_idx CASCADE;
CREATE INDEX expense_type_id_idx ON "INV".expense
USING btree
(
	type_id
);
-- ddl-end --

-- object: service_type_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVC".service_type_id_idx CASCADE;
CREATE INDEX service_type_id_idx ON "SVC".service
USING btree
(
	type_id
);
-- ddl-end --

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
	full_name varchar(200) NOT NULL,
	company varchar(200),
	document varchar(20),
	created_at timestamp DEFAULT now(),
	finish_at timestamp,
	total_time integer,
	time_appointment varchar(10),
	is_finish boolean DEFAULT false,
	created_by_id integer,
	note text,
	entry_time varchar(10),
	double_turn boolean,
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
	created_by_id
);
-- ddl-end --

-- object: "CTM".type_turn | type: TABLE --
-- DROP TABLE IF EXISTS "CTM".type_turn CASCADE;
CREATE TABLE "CTM".type_turn (
	id serial NOT NULL,
	name varchar(50) NOT NULL,
	description text,
	created_at timestamp DEFAULT now(),
	status boolean NOT NULL,
	created_by integer,
	type_turn_id integer,
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

-- object: assigned_to_appointment_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "APMT".assigned_to_appointment_id_idx CASCADE;
CREATE INDEX assigned_to_appointment_id_idx ON "APMT".appointment
USING btree
(
	assigned_to_id
);
-- ddl-end --

-- object: "SVY".survey | type: TABLE --
-- DROP TABLE IF EXISTS "SVY".survey CASCADE;
CREATE TABLE "SVY".survey (
	id serial NOT NULL,
	name text NOT NULL,
	description text,
	created_at timestamp DEFAULT now(),
	created_by integer,
	status boolean DEFAULT true,
	anonymous boolean DEFAULT false,
	all_users boolean DEFAULT false,
	CONSTRAINT survey_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "SVY".survey OWNER TO root;
-- ddl-end --

-- object: "SVY".category | type: TABLE --
-- DROP TABLE IF EXISTS "SVY".category CASCADE;
CREATE TABLE "SVY".category (
	id serial NOT NULL,
	name text NOT NULL,
	description text,
	created_at timestamp DEFAULT now(),
	status boolean DEFAULT true,
	CONSTRAINT category_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "SVY".category OWNER TO root;
-- ddl-end --

-- object: "SVY".question | type: TABLE --
-- DROP TABLE IF EXISTS "SVY".question CASCADE;
CREATE TABLE "SVY".question (
	id serial NOT NULL,
	name text NOT NULL,
	description text,
	status boolean DEFAULT true,
	created_at timestamp DEFAULT now(),
	category_id integer,
	type varchar(50) NOT NULL,
	CONSTRAINT question_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "SVY".question OWNER TO root;
-- ddl-end --

-- object: "SVY".option_question | type: TABLE --
-- DROP TABLE IF EXISTS "SVY".option_question CASCADE;
CREATE TABLE "SVY".option_question (
	id serial NOT NULL,
	name text NOT NULL,
	description text,
	created_at timestamp DEFAULT now(),
	question_id integer,
	CONSTRAINT option_question_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "SVY".option_question OWNER TO root;
-- ddl-end --

-- object: "SVY".answer | type: TABLE --
-- DROP TABLE IF EXISTS "SVY".answer CASCADE;
CREATE TABLE "SVY".answer (
	id serial NOT NULL,
	created_at timestamp DEFAULT now(),
	question_id integer,
	option_question_id integer,
	text_answer text,
	survey_answer_id integer,
	survey_id integer,
	CONSTRAINT answer_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "SVY".answer OWNER TO root;
-- ddl-end --

-- object: "SVY".survey_category | type: TABLE --
-- DROP TABLE IF EXISTS "SVY".survey_category CASCADE;
CREATE TABLE "SVY".survey_category (
	id serial NOT NULL,
	survey_id integer,
	category_id integer,
	CONSTRAINT survey_category_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "SVY".survey_category OWNER TO root;
-- ddl-end --

-- object: survey_created_by_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVY".survey_created_by_id_idx CASCADE;
CREATE INDEX survey_created_by_id_idx ON "SVY".survey
USING btree
(
	created_by
);
-- ddl-end --

-- object: question_category_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVY".question_category_id_idx CASCADE;
CREATE INDEX question_category_id_idx ON "SVY".question
USING btree
(
	category_id
);
-- ddl-end --

-- object: survey_category_category_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVY".survey_category_category_id_idx CASCADE;
CREATE INDEX survey_category_category_id_idx ON "SVY".survey_category
USING btree
(
	category_id
);
-- ddl-end --

-- object: survey_category_survey_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVY".survey_category_survey_id_idx CASCADE;
CREATE INDEX survey_category_survey_id_idx ON "SVY".survey_category
USING btree
(
	survey_id
);
-- ddl-end --

-- object: answer_question_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVY".answer_question_id_idx CASCADE;
CREATE INDEX answer_question_id_idx ON "SVY".answer
USING btree
(
	question_id
);
-- ddl-end --

-- object: answer_option_question_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVY".answer_option_question_id_idx CASCADE;
CREATE INDEX answer_option_question_id_idx ON "SVY".answer
USING btree
(
	option_question_id
);
-- ddl-end --

-- object: option_question_question_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVY".option_question_question_id_idx CASCADE;
CREATE INDEX option_question_question_id_idx ON "SVY".option_question
USING btree
(
	question_id
);
-- ddl-end --

-- object: "SVY".survey_answer | type: TABLE --
-- DROP TABLE IF EXISTS "SVY".survey_answer CASCADE;
CREATE TABLE "SVY".survey_answer (
	id serial NOT NULL,
	complete boolean DEFAULT false,
	comment text,
	start_date timestamp,
	end_date timestamp,
	created_by integer,
	assigned_to integer,
	survey_id integer,
	CONSTRAINT survey_answer_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "SVY".survey_answer OWNER TO root;
-- ddl-end --

-- object: survey_answer_created_by_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVY".survey_answer_created_by_id_idx CASCADE;
CREATE INDEX survey_answer_created_by_id_idx ON "SVY".survey_answer
USING btree
(
	created_by
);
-- ddl-end --

-- object: survey_answer_assigned_to_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVY".survey_answer_assigned_to_id_idx CASCADE;
CREATE INDEX survey_answer_assigned_to_id_idx ON "SVY".survey_answer
USING btree
(
	assigned_to
);
-- ddl-end --

-- object: survey_answer_survey_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVY".survey_answer_survey_id_idx CASCADE;
CREATE INDEX survey_answer_survey_id_idx ON "SVY".survey_answer
USING btree
(
	survey_id
);
-- ddl-end --

-- object: answer_survey_answer_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVY".answer_survey_answer_id_idx CASCADE;
CREATE INDEX answer_survey_answer_id_idx ON "SVY".answer
USING btree
(
	survey_answer_id
);
-- ddl-end --

-- object: answer_survey_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "SVY".answer_survey_id_idx CASCADE;
CREATE INDEX answer_survey_id_idx ON "SVY".answer
USING btree
(
	survey_id
);
-- ddl-end --

-- object: "PVD".provider | type: TABLE --
-- DROP TABLE IF EXISTS "PVD".provider CASCADE;
CREATE TABLE "PVD".provider (
	id serial NOT NULL,
	name text NOT NULL,
	phone_number varchar(20) NOT NULL,
	address varchar(100),
	email varchar(150),
	document varchar(30) NOT NULL,
	status boolean DEFAULT true,
	created_at timestamp DEFAULT now(),
	document_type_id integer,
	created_by_id integer,
	amount_debt money DEFAULT 0,
	description text,
	CONSTRAINT provider_pk PRIMARY KEY (id),
	CONSTRAINT email_unique UNIQUE (email)
);
-- ddl-end --
ALTER TABLE "PVD".provider OWNER TO root;
-- ddl-end --

-- object: "PVD".account_payable | type: TABLE --
-- DROP TABLE IF EXISTS "PVD".account_payable CASCADE;
CREATE TABLE "PVD".account_payable (
	id serial NOT NULL,
	description text,
	paid boolean DEFAULT false,
	max_date_of_pay timestamp NOT NULL,
	created_at timestamp DEFAULT now(),
	reference varchar(100),
	created_by_id integer,
	provider_id integer,
	amount money NOT NULL,
	amount_paid money DEFAULT 0,
	CONSTRAINT account_payable_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "PVD".account_payable OWNER TO root;
-- ddl-end --

-- object: provider_document_type_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "PVD".provider_document_type_id_idx CASCADE;
CREATE INDEX provider_document_type_id_idx ON "PVD".provider
USING btree
(
	document_type_id
);
-- ddl-end --

-- object: provider_created_by_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "PVD".provider_created_by_id_idx CASCADE;
CREATE INDEX provider_created_by_id_idx ON "PVD".provider
USING btree
(
	created_by_id
);
-- ddl-end --

-- object: account_payable_created_by_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "PVD".account_payable_created_by_id_idx CASCADE;
CREATE INDEX account_payable_created_by_id_idx ON "PVD".account_payable
USING btree
(
	created_by_id
);
-- ddl-end --

-- object: account_payable_provider_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "PVD".account_payable_provider_id_idx CASCADE;
CREATE INDEX account_payable_provider_id_idx ON "PVD".account_payable
USING btree
(
	provider_id
);
-- ddl-end --

-- object: "PVD".payment | type: TABLE --
-- DROP TABLE IF EXISTS "PVD".payment CASCADE;
CREATE TABLE "PVD".payment (
	id serial NOT NULL,
	amount money NOT NULL,
	description text,
	payment_date timestamp NOT NULL,
	reference varchar(100),
	method varchar(150) NOT NULL,
	created_at timestamp DEFAULT now(),
	created_by_id integer,
	expense_id integer,
	CONSTRAINT payment_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "PVD".payment OWNER TO root;
-- ddl-end --

-- object: "PVD".payment_account_payable | type: TABLE --
-- DROP TABLE IF EXISTS "PVD".payment_account_payable CASCADE;
CREATE TABLE "PVD".payment_account_payable (
	id serial NOT NULL,
	amount money NOT NULL,
	account_payable_id integer,
	payment_id integer,
	CONSTRAINT payment_account_payable_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "PVD".payment_account_payable OWNER TO root;
-- ddl-end --

-- object: payment_account_payable_account_payable_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "PVD".payment_account_payable_account_payable_id_idx CASCADE;
CREATE INDEX payment_account_payable_account_payable_id_idx ON "PVD".payment_account_payable
USING btree
(
	account_payable_id
);
-- ddl-end --

-- object: payment_account_payable_payment_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "PVD".payment_account_payable_payment_id_idx CASCADE;
CREATE INDEX payment_account_payable_payment_id_idx ON "PVD".payment_account_payable
USING btree
(
	payment_id
);
-- ddl-end --

-- object: payment_created_by_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "PVD".payment_created_by_id_idx CASCADE;
CREATE INDEX payment_created_by_id_idx ON "PVD".payment
USING btree
(
	created_by_id
);
-- ddl-end --

-- object: payment_expense_id_idx | type: INDEX --
-- DROP INDEX IF EXISTS "PVD".payment_expense_id_idx CASCADE;
CREATE INDEX payment_expense_id_idx ON "PVD".payment
USING btree
(
	expense_id
);
-- ddl-end --

-- object: "CNFG".banner | type: TABLE --
-- DROP TABLE IF EXISTS "CNFG".banner CASCADE;
CREATE TABLE "CNFG".banner (
	id serial NOT NULL,
	name varchar(200) NOT NULL,
	description text,
	status boolean DEFAULT true,
	created_at timestamp DEFAULT now(),
	photo varchar(200),
	CONSTRAINT banner_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE "CNFG".banner OWNER TO root;
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
-- -- ddl-end --


-- [ Created foreign keys ] --
-- object: "Inventory_inventory_in_out_fk" | type: CONSTRAINT --
-- ALTER TABLE "INV".inventory_in_out DROP CONSTRAINT IF EXISTS "Inventory_inventory_in_out_fk" CASCADE;
ALTER TABLE "INV".inventory_in_out ADD CONSTRAINT "Inventory_inventory_in_out_fk" FOREIGN KEY ("Inventory_id")
REFERENCES "INV"."Inventory" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: service_inventory_in_out_fk | type: CONSTRAINT --
-- ALTER TABLE "INV".inventory_in_out DROP CONSTRAINT IF EXISTS service_inventory_in_out_fk CASCADE;
ALTER TABLE "INV".inventory_in_out ADD CONSTRAINT service_inventory_in_out_fk FOREIGN KEY (service_id)
REFERENCES "SVC".service (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: appointment_service_fk | type: CONSTRAINT --
-- ALTER TABLE "SVC".service DROP CONSTRAINT IF EXISTS appointment_service_fk CASCADE;
ALTER TABLE "SVC".service ADD CONSTRAINT appointment_service_fk FOREIGN KEY (appointment_id)
REFERENCES "APMT".appointment (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: customer_service_fk | type: CONSTRAINT --
-- ALTER TABLE "SVC".service DROP CONSTRAINT IF EXISTS customer_service_fk CASCADE;
ALTER TABLE "SVC".service ADD CONSTRAINT customer_service_fk FOREIGN KEY (customer_id)
REFERENCES "CTM".customer (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: customer_appointment_fk | type: CONSTRAINT --
-- ALTER TABLE "APMT".appointment DROP CONSTRAINT IF EXISTS customer_appointment_fk CASCADE;
ALTER TABLE "APMT".appointment ADD CONSTRAINT customer_appointment_fk FOREIGN KEY (customer_id)
REFERENCES "CTM".customer (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

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

-- object: rol_user_fk | type: CONSTRAINT --
-- ALTER TABLE "USR"."user" DROP CONSTRAINT IF EXISTS rol_user_fk CASCADE;
ALTER TABLE "USR"."user" ADD CONSTRAINT rol_user_fk FOREIGN KEY (rol_id)
REFERENCES "USR".rol (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_expense_fk | type: CONSTRAINT --
-- ALTER TABLE "INV".expense DROP CONSTRAINT IF EXISTS user_expense_fk CASCADE;
ALTER TABLE "INV".expense ADD CONSTRAINT user_expense_fk FOREIGN KEY (created_by)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

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

-- object: appointment_type_appointment_fk | type: CONSTRAINT --
-- ALTER TABLE "APMT".appointment DROP CONSTRAINT IF EXISTS appointment_type_appointment_fk CASCADE;
ALTER TABLE "APMT".appointment ADD CONSTRAINT appointment_type_appointment_fk FOREIGN KEY (appointment_type_id)
REFERENCES "APMT".appointment_type (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: "list_Inventory_fk" | type: CONSTRAINT --
-- ALTER TABLE "INV"."Inventory" DROP CONSTRAINT IF EXISTS "list_Inventory_fk" CASCADE;
ALTER TABLE "INV"."Inventory" ADD CONSTRAINT "list_Inventory_fk" FOREIGN KEY (status_id)
REFERENCES "CNFG".list (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: list_expense_fk | type: CONSTRAINT --
-- ALTER TABLE "INV".expense DROP CONSTRAINT IF EXISTS list_expense_fk CASCADE;
ALTER TABLE "INV".expense ADD CONSTRAINT list_expense_fk FOREIGN KEY (type_id)
REFERENCES "CNFG".list (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: list_service_fk1 | type: CONSTRAINT --
-- ALTER TABLE "SVC".service DROP CONSTRAINT IF EXISTS list_service_fk1 CASCADE;
ALTER TABLE "SVC".service ADD CONSTRAINT list_service_fk1 FOREIGN KEY (type_id)
REFERENCES "CNFG".list (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_note_fk | type: CONSTRAINT --
-- ALTER TABLE "CNFG".note DROP CONSTRAINT IF EXISTS user_note_fk CASCADE;
ALTER TABLE "CNFG".note ADD CONSTRAINT user_note_fk FOREIGN KEY (created_by)
REFERENCES "USR"."user" (id) MATCH FULL
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

-- object: user_type_turn_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".type_turn DROP CONSTRAINT IF EXISTS user_type_turn_fk CASCADE;
ALTER TABLE "CTM".type_turn ADD CONSTRAINT user_type_turn_fk FOREIGN KEY (created_by)
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

-- object: user_appointment_fk1 | type: CONSTRAINT --
-- ALTER TABLE "APMT".appointment DROP CONSTRAINT IF EXISTS user_appointment_fk1 CASCADE;
ALTER TABLE "APMT".appointment ADD CONSTRAINT user_appointment_fk1 FOREIGN KEY (assigned_to_id)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: category_question_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".question DROP CONSTRAINT IF EXISTS category_question_fk CASCADE;
ALTER TABLE "SVY".question ADD CONSTRAINT category_question_fk FOREIGN KEY (category_id)
REFERENCES "SVY".category (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_survey_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".survey DROP CONSTRAINT IF EXISTS user_survey_fk CASCADE;
ALTER TABLE "SVY".survey ADD CONSTRAINT user_survey_fk FOREIGN KEY (created_by)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: question_option_question_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".option_question DROP CONSTRAINT IF EXISTS question_option_question_fk CASCADE;
ALTER TABLE "SVY".option_question ADD CONSTRAINT question_option_question_fk FOREIGN KEY (question_id)
REFERENCES "SVY".question (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: question_answer_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".answer DROP CONSTRAINT IF EXISTS question_answer_fk CASCADE;
ALTER TABLE "SVY".answer ADD CONSTRAINT question_answer_fk FOREIGN KEY (question_id)
REFERENCES "SVY".question (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: option_question_answer_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".answer DROP CONSTRAINT IF EXISTS option_question_answer_fk CASCADE;
ALTER TABLE "SVY".answer ADD CONSTRAINT option_question_answer_fk FOREIGN KEY (option_question_id)
REFERENCES "SVY".option_question (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: survey_survey_category_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".survey_category DROP CONSTRAINT IF EXISTS survey_survey_category_fk CASCADE;
ALTER TABLE "SVY".survey_category ADD CONSTRAINT survey_survey_category_fk FOREIGN KEY (survey_id)
REFERENCES "SVY".survey (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: category_survey_category_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".survey_category DROP CONSTRAINT IF EXISTS category_survey_category_fk CASCADE;
ALTER TABLE "SVY".survey_category ADD CONSTRAINT category_survey_category_fk FOREIGN KEY (category_id)
REFERENCES "SVY".category (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_survey_answer_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".survey_answer DROP CONSTRAINT IF EXISTS user_survey_answer_fk CASCADE;
ALTER TABLE "SVY".survey_answer ADD CONSTRAINT user_survey_answer_fk FOREIGN KEY (created_by)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_survey_answer_fk1 | type: CONSTRAINT --
-- ALTER TABLE "SVY".survey_answer DROP CONSTRAINT IF EXISTS user_survey_answer_fk1 CASCADE;
ALTER TABLE "SVY".survey_answer ADD CONSTRAINT user_survey_answer_fk1 FOREIGN KEY (assigned_to)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: survey_survey_answer_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".survey_answer DROP CONSTRAINT IF EXISTS survey_survey_answer_fk CASCADE;
ALTER TABLE "SVY".survey_answer ADD CONSTRAINT survey_survey_answer_fk FOREIGN KEY (survey_id)
REFERENCES "SVY".survey (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: survey_answer_answer_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".answer DROP CONSTRAINT IF EXISTS survey_answer_answer_fk CASCADE;
ALTER TABLE "SVY".answer ADD CONSTRAINT survey_answer_answer_fk FOREIGN KEY (survey_answer_id)
REFERENCES "SVY".survey_answer (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: survey_answer_fk | type: CONSTRAINT --
-- ALTER TABLE "SVY".answer DROP CONSTRAINT IF EXISTS survey_answer_fk CASCADE;
ALTER TABLE "SVY".answer ADD CONSTRAINT survey_answer_fk FOREIGN KEY (survey_id)
REFERENCES "SVY".survey (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: list_provider_fk | type: CONSTRAINT --
-- ALTER TABLE "PVD".provider DROP CONSTRAINT IF EXISTS list_provider_fk CASCADE;
ALTER TABLE "PVD".provider ADD CONSTRAINT list_provider_fk FOREIGN KEY (document_type_id)
REFERENCES "CNFG".list (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_provider_fk | type: CONSTRAINT --
-- ALTER TABLE "PVD".provider DROP CONSTRAINT IF EXISTS user_provider_fk CASCADE;
ALTER TABLE "PVD".provider ADD CONSTRAINT user_provider_fk FOREIGN KEY (created_by_id)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_account_payable_fk | type: CONSTRAINT --
-- ALTER TABLE "PVD".account_payable DROP CONSTRAINT IF EXISTS user_account_payable_fk CASCADE;
ALTER TABLE "PVD".account_payable ADD CONSTRAINT user_account_payable_fk FOREIGN KEY (created_by_id)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: provider_account_payable_fk | type: CONSTRAINT --
-- ALTER TABLE "PVD".account_payable DROP CONSTRAINT IF EXISTS provider_account_payable_fk CASCADE;
ALTER TABLE "PVD".account_payable ADD CONSTRAINT provider_account_payable_fk FOREIGN KEY (provider_id)
REFERENCES "PVD".provider (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_payment_fk | type: CONSTRAINT --
-- ALTER TABLE "PVD".payment DROP CONSTRAINT IF EXISTS user_payment_fk CASCADE;
ALTER TABLE "PVD".payment ADD CONSTRAINT user_payment_fk FOREIGN KEY (created_by_id)
REFERENCES "USR"."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: account_payable_payment_account_payable_fk | type: CONSTRAINT --
-- ALTER TABLE "PVD".payment_account_payable DROP CONSTRAINT IF EXISTS account_payable_payment_account_payable_fk CASCADE;
ALTER TABLE "PVD".payment_account_payable ADD CONSTRAINT account_payable_payment_account_payable_fk FOREIGN KEY (account_payable_id)
REFERENCES "PVD".account_payable (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: payment_payment_account_payable_fk | type: CONSTRAINT --
-- ALTER TABLE "PVD".payment_account_payable DROP CONSTRAINT IF EXISTS payment_payment_account_payable_fk CASCADE;
ALTER TABLE "PVD".payment_account_payable ADD CONSTRAINT payment_payment_account_payable_fk FOREIGN KEY (payment_id)
REFERENCES "PVD".payment (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: expense_payment_fk | type: CONSTRAINT --
-- ALTER TABLE "PVD".payment DROP CONSTRAINT IF EXISTS expense_payment_fk CASCADE;
ALTER TABLE "PVD".payment ADD CONSTRAINT expense_payment_fk FOREIGN KEY (expense_id)
REFERENCES "INV".expense (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: list_type_turn_fk | type: CONSTRAINT --
-- ALTER TABLE "CTM".type_turn DROP CONSTRAINT IF EXISTS list_type_turn_fk CASCADE;
ALTER TABLE "CTM".type_turn ADD CONSTRAINT list_type_turn_fk FOREIGN KEY (type_turn_id)
REFERENCES "CNFG".list (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

