const database = require('./database');

database.select([
  "games.*",
  "studios.name as studio"
  ]).table("games").innerJoin("studios","studios.game_id", "games.id").then(data => {
  let studiosGamesArr = data;

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