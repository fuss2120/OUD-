export default {
    scott_development: {
        host: "zardoz.mscs.mu.edu",
        user: "scoyne",
        password: "scottpass",
        database: "scotttest"
    },
    matt_development: {
      host: "zardoz.mscs.mu.edu",
      user: "mverhey",
      password: "gilg",
      database: "matttest"
    }
}

/*
    Permission for above user created with mysql command:
    GRANT ALL PRIVILEGES ON scotttest.* TO 'scoyne'@'%.mscsnet.mu.edu' IDENTIFIED BY 'scottpass';
*/
