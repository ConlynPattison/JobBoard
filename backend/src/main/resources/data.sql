insert into user_table
(username, email, password, role) values
('test', 'dwisneski@csumb.edu', '$2a$10$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue','USER'),
('admin', 'admin@csumb.edu', '$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW' , 'ADMIN')
;

insert into listing
(id, external_id, job_title, company_logo_url, application_url) values
(1, 'fgsdfjhs', 'google engineer', 'google.com', 'youtube.com'),
(2, 'sadgsagh', 'facebook engineer', 'facebook.com', 'twitter.com')
;

insert into saved_listing
(id, listing_id, user_id, state) values
(1, 2, 1, 'APPLIED'),
(2, 1, 1, 'ASSESSMENT')
;
