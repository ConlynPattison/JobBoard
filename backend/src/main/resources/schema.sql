create table user_table
(
    id identity primary key,
    username varchar(25) unique,
    email    varchar(25) unique,
    password varchar(100), -- encrypted
    role     varchar(25) DEFAULT NULL
);

create table listing
(
    id               int NOT NULL AUTO_INCREMENT,
    external_id      varchar(255) unique,
    job_title        varchar(255) DEFAULT NULL,
    company_logo_url varchar(255) DEFAULT NULL,
    application_url  varchar(255) DEFAULT NULL,
    PRIMARY KEY (id)
);

create table saved_listing
(
    id         int NOT NULL AUTO_INCREMENT,
    listing_id int DEFAULT null,
    user_id    int DEFAULT null,
    state      enum ('saved', 'applied', 'assessment', 'interview', 'offer', 'accepted', 'rejected') not null,
    PRIMARY KEY (id),
    FOREIGN KEY (listing_id) REFERENCES listing (id) on delete cascade,
    FOREIGN KEY (user_id) REFERENCES user_table (id) on delete cascade
);

create table suggested_listing
(
    id           int NOT NULL AUTO_INCREMENT,
    listing_id   int  DEFAULT null,
    user_id      int  DEFAULT null,
    from_user_id int  DEFAULT null,
    opened       bool default false,
    PRIMARY KEY (id),
    FOREIGN KEY (listing_id) REFERENCES listing (id) on delete cascade,
    FOREIGN KEY (user_id) REFERENCES user_table (id) on delete cascade,
    FOREIGN KEY (from_user_id) REFERENCES user_table (id) on delete cascade
);
