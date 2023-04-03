--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: appointments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.appointments (
    id integer NOT NULL,
    date date NOT NULL,
    hour time without time zone NOT NULL,
    medic_id integer,
    patient_id integer,
    confirmed boolean DEFAULT false NOT NULL,
    canceled boolean DEFAULT false NOT NULL,
    done boolean DEFAULT false NOT NULL
);


--
-- Name: appointments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.appointments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: appointments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.appointments_id_seq OWNED BY public.appointments.id;


--
-- Name: available_times; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.available_times (
    id integer NOT NULL,
    medic_id integer,
    week_day integer NOT NULL,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL
);


--
-- Name: available_times_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.available_times_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: available_times_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.available_times_id_seq OWNED BY public.available_times.id;


--
-- Name: medic_specialty; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.medic_specialty (
    id integer NOT NULL,
    id_medic integer NOT NULL,
    id_specialty integer NOT NULL
);


--
-- Name: medic_specialty_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.medic_specialty_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: medic_specialty_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.medic_specialty_id_seq OWNED BY public.medic_specialty.id;


--
-- Name: medics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.medics (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    phone character varying(20),
    crm character varying(10) NOT NULL,
    city character varying(100) NOT NULL
);


--
-- Name: medics_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.medics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: medics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.medics_id_seq OWNED BY public.medics.id;


--
-- Name: patients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.patients (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    phone character varying(20) NOT NULL
);


--
-- Name: patients_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.patients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: patients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.patients_id_seq OWNED BY public.patients.id;


--
-- Name: specialties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.specialties (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


--
-- Name: specialties_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.specialties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: specialties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.specialties_id_seq OWNED BY public.specialties.id;


--
-- Name: appointments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments ALTER COLUMN id SET DEFAULT nextval('public.appointments_id_seq'::regclass);


--
-- Name: available_times id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.available_times ALTER COLUMN id SET DEFAULT nextval('public.available_times_id_seq'::regclass);


--
-- Name: medic_specialty id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medic_specialty ALTER COLUMN id SET DEFAULT nextval('public.medic_specialty_id_seq'::regclass);


--
-- Name: medics id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medics ALTER COLUMN id SET DEFAULT nextval('public.medics_id_seq'::regclass);


--
-- Name: patients id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients ALTER COLUMN id SET DEFAULT nextval('public.patients_id_seq'::regclass);


--
-- Name: specialties id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.specialties ALTER COLUMN id SET DEFAULT nextval('public.specialties_id_seq'::regclass);


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.appointments VALUES (1, '2023-04-03', '11:00:00', 1, 1, false, false, false);


--
-- Data for Name: available_times; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.available_times VALUES (3, 1, 1, '10:00:00', '11:00:00');
INSERT INTO public.available_times VALUES (4, 1, 1, '11:00:00', '12:00:00');


--
-- Data for Name: medic_specialty; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.medic_specialty VALUES (10, 1, 1);
INSERT INTO public.medic_specialty VALUES (11, 1, 2);


--
-- Data for Name: medics; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.medics VALUES (1, 'Jose', 'jose@gmail.com', '$2b$10$Lo8BmkJO1B4Fz7Zy.Q3kkep0ueBDLdTtAqcc88gZQlkIuFUnzFOVS', '999999999', '123123', 'Porto Alegre');


--
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.patients VALUES (1, 'Alex', 'alex@gmail.com', '$2b$10$CTefnTvw/7HDi6NxFROv9.6HGVUs1/D/H9gHk76MweKqpXkimVgMq', '111111111');


--
-- Data for Name: specialties; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.specialties VALUES (1, 'Alergologia');
INSERT INTO public.specialties VALUES (2, 'Angiologia');
INSERT INTO public.specialties VALUES (3, 'Buco Maxilo');
INSERT INTO public.specialties VALUES (4, 'Cardiologia Clínica');
INSERT INTO public.specialties VALUES (5, 'Cardiologia Infantil');
INSERT INTO public.specialties VALUES (6, 'Cirurgia Cabeça e Pescoço');
INSERT INTO public.specialties VALUES (7, 'Cirurgia Cardíaca');
INSERT INTO public.specialties VALUES (8, 'Cirurgia de Tórax');
INSERT INTO public.specialties VALUES (9, 'Cirurgia Geral');
INSERT INTO public.specialties VALUES (10, 'Cirurgia Pediátrica');
INSERT INTO public.specialties VALUES (11, 'Cirurgia Plástica');
INSERT INTO public.specialties VALUES (12, 'Cirurgia Vascular');
INSERT INTO public.specialties VALUES (13, 'Clínica Médica');
INSERT INTO public.specialties VALUES (14, 'Coloproctologia');
INSERT INTO public.specialties VALUES (15, 'Dermatologia');
INSERT INTO public.specialties VALUES (16, 'Endocrinologia e Metabologia');
INSERT INTO public.specialties VALUES (17, 'Endoscopia');
INSERT INTO public.specialties VALUES (18, 'Gastroenterologia');
INSERT INTO public.specialties VALUES (19, 'Genética Médica');
INSERT INTO public.specialties VALUES (20, 'Geriatria');
INSERT INTO public.specialties VALUES (21, 'Ginecologia e Obstetrícia');
INSERT INTO public.specialties VALUES (22, 'Hematologia e Hemoterapia');
INSERT INTO public.specialties VALUES (23, 'Homeopatia');
INSERT INTO public.specialties VALUES (24, 'Infectologia');
INSERT INTO public.specialties VALUES (25, 'Mastologia');
INSERT INTO public.specialties VALUES (26, 'Medicina de Família e Comunidade');
INSERT INTO public.specialties VALUES (27, 'Medicina do Trabalho');
INSERT INTO public.specialties VALUES (28, 'Medicina de Urgência');
INSERT INTO public.specialties VALUES (29, 'Medicina do Sono');
INSERT INTO public.specialties VALUES (30, 'Medicina Esportiva');
INSERT INTO public.specialties VALUES (31, 'Medicina Física e Reabilitação');
INSERT INTO public.specialties VALUES (32, 'Medicina Intensiva');
INSERT INTO public.specialties VALUES (33, 'Medicina Legal e Perícia Médica');
INSERT INTO public.specialties VALUES (34, 'Medicina Nuclear');
INSERT INTO public.specialties VALUES (35, 'Medicina Preventiva e Social');
INSERT INTO public.specialties VALUES (36, 'Nefrologia');
INSERT INTO public.specialties VALUES (37, 'Neurocirurgia');
INSERT INTO public.specialties VALUES (38, 'Neurologia');
INSERT INTO public.specialties VALUES (39, 'Nutrologia');
INSERT INTO public.specialties VALUES (40, 'Oftalmologia');
INSERT INTO public.specialties VALUES (41, 'Ortopedia e Traumatologia');
INSERT INTO public.specialties VALUES (42, 'Otorrinolaringologia');
INSERT INTO public.specialties VALUES (43, 'Patologia');
INSERT INTO public.specialties VALUES (44, 'Pediatria');
INSERT INTO public.specialties VALUES (45, 'Pneumologia');
INSERT INTO public.specialties VALUES (46, 'Psiquiatria');
INSERT INTO public.specialties VALUES (47, 'Radiologia e Diagnóstico por Imagem');
INSERT INTO public.specialties VALUES (48, 'Radioterapia');
INSERT INTO public.specialties VALUES (49, 'Reumatologia');
INSERT INTO public.specialties VALUES (50, 'Urologia');


--
-- Name: appointments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.appointments_id_seq', 1, true);


--
-- Name: available_times_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.available_times_id_seq', 4, true);


--
-- Name: medic_specialty_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.medic_specialty_id_seq', 11, true);


--
-- Name: medics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.medics_id_seq', 1, true);


--
-- Name: patients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.patients_id_seq', 1, true);


--
-- Name: specialties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.specialties_id_seq', 50, true);


--
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);


--
-- Name: available_times available_times_medic_id_week_day_start_time_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.available_times
    ADD CONSTRAINT available_times_medic_id_week_day_start_time_key UNIQUE (medic_id, week_day, start_time);


--
-- Name: available_times available_times_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.available_times
    ADD CONSTRAINT available_times_pkey PRIMARY KEY (id);


--
-- Name: medic_specialty medic_specialty_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medic_specialty
    ADD CONSTRAINT medic_specialty_pkey PRIMARY KEY (id);


--
-- Name: medics medics_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medics
    ADD CONSTRAINT medics_email_key UNIQUE (email);


--
-- Name: medics medics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medics
    ADD CONSTRAINT medics_pkey PRIMARY KEY (id);


--
-- Name: patients patients_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_email_key UNIQUE (email);


--
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);


--
-- Name: specialties specialties_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.specialties
    ADD CONSTRAINT specialties_pkey PRIMARY KEY (id);


--
-- Name: appointments appointments_medic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_medic_id_fkey FOREIGN KEY (medic_id) REFERENCES public.medics(id) ON DELETE CASCADE;


--
-- Name: appointments appointments_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE CASCADE;


--
-- Name: available_times available_times_medic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.available_times
    ADD CONSTRAINT available_times_medic_id_fkey FOREIGN KEY (medic_id) REFERENCES public.medics(id) ON DELETE CASCADE;


--
-- Name: medic_specialty medic_specialty_id_medic_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medic_specialty
    ADD CONSTRAINT medic_specialty_id_medic_fkey FOREIGN KEY (id_medic) REFERENCES public.medics(id);


--
-- Name: medic_specialty medic_specialty_id_specialty_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medic_specialty
    ADD CONSTRAINT medic_specialty_id_specialty_fkey FOREIGN KEY (id_specialty) REFERENCES public.specialties(id);


--
-- PostgreSQL database dump complete
--

