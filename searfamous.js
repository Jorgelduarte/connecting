
const settings = require("./settings"); // settings.json

var knex = require('knex')({
    client: 'pg',
    connection: settings
  });

var searchName = process.argv[2];

knex.select('*')
.from('famous_people')
.where('last_name','like',`%${searchName}%`)
.asCallback(function(err, rows) {
    // console.log(arguments);
    if (err) {
      return console.error(err);
    }
    rows.forEach(function (row) {
      console.log('-', row.id + ':', row.first_name, row.last_name + ', born:', row.birthdate.getFullYear() + '-'+ (row.birthdate.getMonth() + 1) + '-'+ row.birthdate.getDate());
    });
    knex.destroy();
  });