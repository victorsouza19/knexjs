const database = require('./database');

database.select().table("games").orderBy("price", "asc").then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});