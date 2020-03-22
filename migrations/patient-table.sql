create table Patients (
    pid                     int NOT NULL AUTO_INCREMENT primary key,
    first_name              varchar(255) not null,
    last_name               varchar(255) not null,
    phone_number            varchar(255) not null,
    additional_comments      TEXT
);