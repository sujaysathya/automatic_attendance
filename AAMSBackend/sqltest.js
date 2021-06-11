const mysql=require("mysql2")

const pool=mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'mydb2',
    password: 'hello'
});

module.exports=pool.promise();
/*
con.query("CREATE DATABASE mydb3", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
*/