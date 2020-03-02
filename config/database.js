export default {
    scott_development: {
        host: "zardoz.mscs.mu.edu",
        user: "scoyne",
        password: "scottpass",
        database: "scotttest"
    }
}

/*
    Permission for above user created with mysql command:
    GRANT ALL PRIVILEGES ON scotttest.* TO 'scoyne'@'%.mscsnet.mu.edu' IDENTIFIED BY 'scottpass';
*/