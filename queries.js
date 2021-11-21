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
database.where({id: 4}).update({name: "Minecraft 2", price: 1.99}).table("games").then(data => {
  console.log(data);

}).catch(err => {
  console.log(err);

});

/* Order By */
database.select().table("games").orderBy("price", "desc").then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});

/* table 1:1 - Associated Insert */
database.insert({
  name: "Rockstar Games",
  game_id: 2
}).table('studios').then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});

/* table 1:1 - Associated select */
database.select().table("games").innerJoin("studios","studios.game_id", "games.id").then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});

database.select([
  "games.*",
  "studios.name as studio"
  ]).table("games").innerJoin("studios","studios.game_id", "games.id").then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});


/* 1:1 join with where clause */
database.select([
  "games.*",
  "studios.name as studio"
  ]).table("games")
  .leftJoin("studios","studios.game_id", "games.id")
  .where("games.id", 2)
  .then(data => {
    console.log(data);
  }).catch(err => {
    console.log(err);
});


/* 1:n Associated insert is the same scenario of the 1:1 tables */
database.insert({
  name: "Riot",
  game_id: 2
}).table('studios').then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});


/* 1:n Associated select is the same scenario of the 1:1 tables */
database.select([
  "games.*",
  "studios.name as studio"
  ]).table("games").innerJoin("studios","studios.game_id", "games.id").then(data => {

  // studios to array example
  let game = {
    id: 0,
    name: '',
    studios: []
  };

  game.id = data[0].id;
  game.name = data[0].name;

  data.forEach(result => {
    game.studios.push({name: result.studio});
  });
  console.log(game);
  
}).catch(err => {
  console.log(err);
});

/* n:n Associated select */

database.select([
  "studios.name as studio",
  "games.name as game",
  "games.price as price"
])
.table("games_studios")
  .innerJoin("games", "games.id", "games_studios.game_id")
  .innerJoin("studios", "studios.id", "games_studios.id")
.then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});

/* Transactions */

async function transaction(){
  try {
    await database.transaction(async trans => {

      await database.insert({name: "Blizzard"}).table("studios");
      await database.insert({name: "Ubisoft"}).table("studios");
      await database.insert({name: "EA Games"}).table("studios");
      await database.insert({name: "Nintendo"}).table("studios");
      await database.insert({name: "Valve Corporation"}).table("studios");
      await database.insert({name: "Naughty Dog Inc"}).table("studios");

    });
  } catch (error) {
    console.log(error);
  }
};

transaction();