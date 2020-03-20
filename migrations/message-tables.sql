create table Texts (
    id                      int NOT NULL AUTO_INCREMENT primary key,
    user                    varchar(255),
    pid                     int NOT NULL,
    from_patient            boolean NOT NULL,
    message                 TEXT NOT NULL,
    time_sent               timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);