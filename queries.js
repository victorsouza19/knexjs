const database = require('./database');

let data = [
  {
    name: "COD Warzone",
    price: 100.90
  },
  {
    name: "Minecraft",
    price: 9.90
  },
  {
    name: "League of Legends",
    price: 0
  },
  {
    name: "NBA 2K21",
    price: 120.00
  }
]; 



/* INSERT */
database.insert(data).into("games").then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});


/* SELECT */
database.select(["name", "id"]).table("games").then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});





/* NESTED QUERIES (CAN USE ASYNC AWAIT) */
database.insert(data).into("games").then(data => {

  database.select(["name", "id"]).table("games").then(data => {
  console.log(data);
  }).catch(err => {
  console.log(err);
  });

}).catch(err => {
  console.log(err);
});




/* diferent where isn't a good practice */
database.where({name: "Minecraft"}) 
  .where({id: 4})
  .orWhere({id: 5})
  // or only one query to simplify, for example:
  .whereRaw("name = 'Minecraft' or id = 5 and price > 20")
  .table("games").then(game => {
  console.log(game);

}).catch(err => {
  console.log(err);
});




/* SQL pure structure */
database.raw("SELECT * FROM GAMES").then(data => {
  console.log(data);

}).catch(err => {
  console.log(err);
});


/* Delete */
database.where({id: 8}).delete().table("games").then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});



/* Update */
database.where({id: 4}).update({name: "Minecraft 2", price: 0.99}).table("games").then(data => {
  console.log(data);

}).catch(err => {
  console.log(err);

});
