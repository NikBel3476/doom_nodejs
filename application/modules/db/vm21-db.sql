--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-05-15 16:21:58

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

--
-- TOC entry 206 (class 1255 OID 563646)
-- Name: addGamerCoordinates(); Type: FUNCTION; Schema: public; Owner: vm21-user
--

CREATE FUNCTION public."addGamerCoordinates"() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	INSERT INTO "gamerCoordinates" ("gamerId", x, y, z) VALUES 
	((SELECT MAX(users.id) FROM users), 0, 0, 0); 
	RETURN NEW;
END;
$$;


ALTER FUNCTION public."addGamerCoordinates"() OWNER TO "vm21-user";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 563632)
-- Name: gamer; Type: TABLE; Schema: public; Owner: vm21-user
--

CREATE TABLE public.gamer (
    "gamerCoordinatesId" bigint NOT NULL,
    "gamerId" bigint NOT NULL,
    x real NOT NULL,
    y real NOT NULL,
    z real NOT NULL
);


ALTER TABLE public.gamer OWNER TO "vm21-user";

--
-- TOC entry 204 (class 1259 OID 563630)
-- Name: gamerCoordinates_gamerCoordinatesId_seq; Type: SEQUENCE; Schema: public; Owner: vm21-user
--

CREATE SEQUENCE public."gamerCoordinates_gamerCoordinatesId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."gamerCoordinates_gamerCoordinatesId_seq" OWNER TO "vm21-user";

--
-- TOC entry 3017 (class 0 OID 0)
-- Dependencies: 204
-- Name: gamerCoordinates_gamerCoordinatesId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vm21-user
--

ALTER SEQUENCE public."gamerCoordinates_gamerCoordinatesId_seq" OWNED BY public.gamer."gamerCoordinatesId";


--
-- TOC entry 200 (class 1259 OID 300925)
-- Name: messages; Type: TABLE; Schema: public; Owner: vm21-user
--

CREATE TABLE public.messages (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    message text NOT NULL,
    date timestamp without time zone NOT NULL
);


ALTER TABLE public.messages OWNER TO "vm21-user";

--
-- TOC entry 201 (class 1259 OID 300931)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: vm21-user
--

CREATE SEQUENCE public.messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO "vm21-user";

--
-- TOC entry 3018 (class 0 OID 0)
-- Dependencies: 201
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vm21-user
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- TOC entry 202 (class 1259 OID 300933)
-- Name: users; Type: TABLE; Schema: public; Owner: vm21-user
--

CREATE TABLE public.users (
    password text NOT NULL,
    name text NOT NULL,
    login text NOT NULL,
    id bigint NOT NULL,
    token text
);


ALTER TABLE public.users OWNER TO "vm21-user";

--
-- TOC entry 203 (class 1259 OID 300939)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: vm21-user
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO "vm21-user";

--
-- TOC entry 3019 (class 0 OID 0)
-- Dependencies: 203
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vm21-user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2867 (class 2604 OID 563635)
-- Name: gamer gamerCoordinatesId; Type: DEFAULT; Schema: public; Owner: vm21-user
--

ALTER TABLE ONLY public.gamer ALTER COLUMN "gamerCoordinatesId" SET DEFAULT nextval('public."gamerCoordinates_gamerCoordinatesId_seq"'::regclass);


--
-- TOC entry 2865 (class 2604 OID 300941)
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: vm21-user
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- TOC entry 2866 (class 2604 OID 300942)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: vm21-user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3011 (class 0 OID 563632)
-- Dependencies: 205
-- Data for Name: gamer; Type: TABLE DATA; Schema: public; Owner: vm21-user
--

COPY public.gamer ("gamerCoordinatesId", "gamerId", x, y, z) FROM stdin;
1	1	0	0	0
2	2	0	0	0
3	4	0	0	0
4	10	0	0	0
5	11	0	0	0
6	12	0	0	0
\.


--
-- TOC entry 3006 (class 0 OID 300925)
-- Dependencies: 200
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: vm21-user
--

COPY public.messages (id, user_id, message, date) FROM stdin;
8	2	aassd	2021-04-04 16:52:57.909
10	2	werwerwer	2021-04-04 16:54:27.418
11	2	sfsdf	2021-04-04 17:08:25.381
12	10	ssdffds	2021-04-15 16:37:17.291
13	4	qwsddrtyyhgbb	2021-04-27 10:59:56.043
14	2	sdfsdf	2021-04-27 10:59:56.747
15	2	sdfsdf	2021-04-27 10:59:57.271
16	2	sdfsdf	2021-04-27 10:59:57.492
17	4	qwedrt	2021-04-27 11:56:19.012
18	4	qwedrt	2021-04-27 11:56:22.203
19	2	dfgdfgdf	2021-04-27 11:56:26.144
20	4	sfsgf	2021-04-28 15:29:29.869
21	1	sdfsfds	2021-04-28 15:29:38.661
22	2	afasdff	2021-04-28 15:33:27.199
23	2	afasdff	2021-04-28 15:33:28.079
24	2	afasdff	2021-04-28 16:18:55.971
25	2	afasdff	2021-04-28 16:19:03.329
26	2	afasdff	2021-04-28 16:19:03.492
27	2	afasdff	2021-04-28 16:19:03.857
28	2	sdfsdf	2021-04-28 16:19:06.068
29	4	afasdff	2021-04-28 16:23:08.37
30	4	afasdff	2021-04-28 16:23:08.987
31	4	afasdff	2021-04-28 16:23:09.169
32	4	afasdff	2021-04-28 16:23:09.388
33	2	sdfsdf	2021-04-28 16:51:19.568
\.


--
-- TOC entry 3008 (class 0 OID 300933)
-- Dependencies: 202
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: vm21-user
--

COPY public.users (password, name, login, id, token) FROM stdin;
4e0ad448e475a757e711499d86dce379	kostya	kostya	10	809d3904e91a81d3db8f1546a9feb270
d7ba312b012b3374ef53eb2e3f9830a5	петя	petya	4	42a931e04903f79f2a438edf2beedc51
ff8abe8418689bc03c5b50cf5fd65d47	коля	kolya	11	\N
f26b65a9599373cacde20d421ea55462	оля	olya	12	\N
4a2d247d0c05a4f798b0b03839d94cf0	вася пупкин	vasya	1	9ca2b82e5388733b7c475eb4736ae56f
68626ed9a3adbaf5bfd9148d42edd26b	Мария Штольц	masha	2	825859800dc8a014ffd1eb0e0811bd7b
\.


--
-- TOC entry 3020 (class 0 OID 0)
-- Dependencies: 204
-- Name: gamerCoordinates_gamerCoordinatesId_seq; Type: SEQUENCE SET; Schema: public; Owner: vm21-user
--

SELECT pg_catalog.setval('public."gamerCoordinates_gamerCoordinatesId_seq"', 2, true);


--
-- TOC entry 3021 (class 0 OID 0)
-- Dependencies: 201
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vm21-user
--

SELECT pg_catalog.setval('public.messages_id_seq', 33, true);


--
-- TOC entry 3022 (class 0 OID 0)
-- Dependencies: 203
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vm21-user
--

SELECT pg_catalog.setval('public.users_id_seq', 17, true);


--
-- TOC entry 2873 (class 2606 OID 563637)
-- Name: gamer gamerCoordinates_pkey; Type: CONSTRAINT; Schema: public; Owner: vm21-user
--

ALTER TABLE ONLY public.gamer
    ADD CONSTRAINT "gamerCoordinates_pkey" PRIMARY KEY ("gamerCoordinatesId");


--
-- TOC entry 2869 (class 2606 OID 300944)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: vm21-user
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 2871 (class 2606 OID 300946)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: vm21-user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2875 (class 2620 OID 563647)
-- Name: users add_user; Type: TRIGGER; Schema: public; Owner: vm21-user
--

CREATE TRIGGER add_user AFTER INSERT ON public.users FOR EACH ROW EXECUTE FUNCTION public."addGamerCoordinates"();


--
-- TOC entry 2874 (class 2606 OID 563638)
-- Name: gamer gamerId; Type: FK CONSTRAINT; Schema: public; Owner: vm21-user
--

ALTER TABLE ONLY public.gamer
    ADD CONSTRAINT "gamerId" FOREIGN KEY ("gamerId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2021-05-15 16:21:59

--
-- PostgreSQL database dump complete
--

