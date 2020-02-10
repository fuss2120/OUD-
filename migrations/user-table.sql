create table Users (
    username            varchar(255) primary key,
    user_password            varchar(255) not null
);

insert into Users(username, user_password) VALUES ('admin', 'adminpass');