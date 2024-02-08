-- Diff code generated with pgModeler (PostgreSQL Database Modeler)
-- pgModeler version: 1.0.0-alpha1
-- Diff date: 2024-01-05 14:22:21
-- Source model: system_inventory
-- Database: system_inventory
-- PostgreSQL version: 14.0

-- [ Diff summary ]
-- Dropped objects: 4
-- Created objects: 13
-- Changed objects: 1

SET search_path=public,pg_catalog,"INV","SVC","APMT","CTM","USR","CNFG","SVY";
-- ddl-end --


-- [ Dropped objects ] --
ALTER TABLE "SVY".answer DROP CONSTRAINT IF EXISTS survey_answer_fk CASCADE;
-- ddl-end --
ALTER TABLE "SVY".answer DROP CONSTRAINT IF EXISTS user_answer_fk CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS "SVY".answer_survey_id_idx CASCADE;
-- ddl-end --
DROP INDEX IF EXISTS "SVY".answer_user_id_idx CASCADE;
-- ddl-end --
ALTER TABLE "SVY".question DROP COLUMN IF EXISTS type CASCADE;
-- ddl-end --
ALTER TABLE "SVY".answer DROP COLUMN IF EXISTS user_id CASCADE;
-- ddl-end --
ALTER TABLE "SVY".answer DROP COLUMN IF EXISTS survey_id CASCADE;
-- ddl-end --


-- [ Created objects ] --
-- object: status | type: COLUMN --
-- ALTER TABLE "SVY".survey DROP COLUMN IF EXISTS status CASCADE;
ALTER TABLE "SVY".survey ADD COLUMN status boolean DEFAULT true;
-- ddl-end --


-- object: anonymous | type: COLUMN --
-- ALTER TABLE "SVY".survey DROP COLUMN IF EXISTS anonymous CASCADE;
ALTER TABLE "SVY".survey ADD COLUMN anonymous boolean DEFAULT false;
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

-- object: text_answer | type: COLUMN --
-- ALTER TABLE "SVY".answer DROP COLUMN IF EXISTS text_answer CASCADE;
ALTER TABLE "SVY".answer ADD COLUMN text_answer text;
-- ddl-end --


-- object: survey_answer_id | type: COLUMN --
-- ALTER TABLE "SVY".answer DROP COLUMN IF EXISTS survey_answer_id CASCADE;
ALTER TABLE "SVY".answer ADD COLUMN survey_answer_id integer;
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

