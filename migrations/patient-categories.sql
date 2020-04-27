create table Patient_Categories (
    id                      int NOT NULL AUTO_INCREMENT primary key,
    category                varchar(255) not null
);

insert into Patient_Categories(category) VALUES ('low risk');
insert into Patient_Categories(category) VALUES ('medium risk');
insert into Patient_Categories(category) VALUES ('high risk');
