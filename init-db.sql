CREATE SEQUENCE users_id_seq;
CREATE SEQUENCE posts_id_seq;

-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    birthday date NOT NULL,
    coefficient numeric NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;


-- Table: public.posts

-- DROP TABLE IF EXISTS public.posts;

CREATE TABLE IF NOT EXISTS public.posts
(
    id integer NOT NULL DEFAULT nextval('posts_id_seq'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT posts_pkey PRIMARY KEY (id),
    CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.posts
    OWNER to postgres;

-- test data generation

do $$
begin
for r in 1..1000 loop
INSERT INTO users (name, birthday, coefficient, "createdAt", "updatedAt") VALUES (
	(array['Adam','Oliver','Jack','Harry','Jacob','Charley','Thomas','George','Oscar','Carl', 'Albert','Eric','Jason','Matthews','Williams','Peters','Gibson','Martin','Jordan','Susan','Jackson','Grant','Davis','Hancock'])[floor(random() * 24 + 1)],  
	concat(text(floor(random()*(2023-1980)+1980)),'-', text(floor(random()*(13-1)+1)),'-', text(floor(random()*(29-1)+1)))::DATE,
	(concat(text(floor(random()*9::int)),'.',text(floor(random()*99::int))))::DECIMAL,
	CURRENT_TIMESTAMP(3)::TIMESTAMP,
	CURRENT_TIMESTAMP(3)::TIMESTAMP
);
end loop;
end;
$$;

do $$
begin
for r in 1..6000 loop
INSERT INTO posts (title, "userId", "createdAt", "updatedAt") VALUES (
	(array['Mammal','Reptile','Amphibian','Bird','Fish','Insect','Worm','Rodent','Wildlife','Predator', 'Prey','Pet','Exotic','Endangered','Extinct','Carnivore','Herbivore','Omnivore'])[floor(random() * 18 + 1)],  
	floor(random()*(1001-1)+1),
	CURRENT_TIMESTAMP(3)::TIMESTAMP,
	CURRENT_TIMESTAMP(3)::TIMESTAMP
);
end loop;
end;
$$;