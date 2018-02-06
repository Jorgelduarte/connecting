const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

var searchName = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  
  client.query(`SELECT * FROM famous_people WHERE last_name LIKE '%${searchName}%'`,(err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    result.rows.forEach(function (row) {
      console.log('-', row.id + ':', row.first_name, row.last_name + ', born:', row.birthdate.getFullYear() + '-'+ (row.birthdate.getMonth() + 1) + '-'+ row.birthdate.getDate());
    })
    client.end();
  });
});