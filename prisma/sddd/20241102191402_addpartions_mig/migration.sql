-- Table: public.prod_reviews

DROP TABLE IF EXISTS public.prod_reviews CASCADE;

CREATE TABLE IF NOT EXISTS public.prod_reviews
(
    id text COLLATE pg_catalog."default" NOT NULL DEFAULT gen_random_uuid(),
    comment text COLLATE pg_catalog."default",
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updatedat timestamp without time zone,
    review integer NOT NULL,
    category_id integer NOT NULL,
    user_id text COLLATE pg_catalog."default" NOT NULL,
    prod_id text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT prodreviews_pkey PRIMARY KEY (id, category_id),
    CONSTRAINT prod_reviews_id_key UNIQUE (id, category_id, user_id),
    CONSTRAINT unik_revies UNIQUE (category_id, user_id, prod_id),
    CONSTRAINT categorylist_ffk FOREIGN KEY (category_id)
        REFERENCES public.category (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT commentproduct_ffk FOREIGN KEY (prod_id)
        REFERENCES public.product (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT usercomm_ffks FOREIGN KEY (user_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
) PARTITION BY RANGE (category_id);

ALTER TABLE IF EXISTS public.prod_reviews
    OWNER to postgres;

-- Partitions SQL

CREATE TABLE IF NOT EXISTS public.products_review1_partition PARTITION OF public.prod_reviews
( 
    CONSTRAINT uik_1 UNIQUE (id)
)
    FOR VALUES FROM (1) TO (3)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products_review1_partition
    OWNER to postgres;
CREATE TABLE IF NOT EXISTS public.products_review2_partition PARTITION OF public.prod_reviews
( 
    CONSTRAINT uik_2 UNIQUE (id)
)
    FOR VALUES FROM (3) TO (5)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products_review2_partition
    OWNER to postgres;
CREATE TABLE IF NOT EXISTS public.products_review3_partition PARTITION OF public.prod_reviews
( 
    CONSTRAINT unik_3 UNIQUE (id)
)
    FOR VALUES FROM (5) TO (7)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products_review3_partition
    OWNER to postgres;