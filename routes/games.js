const express = require('express');
const router = express.Router();

module.exports = function (db) {

  router.get("/uno", (req, res) => {
    db.query(`
    SELECT *
    FROM games
    ORDER BY id;
  `)
  .then((response) => {
      res.render("uno", {games: response.rows})
    })
  .catch(err => console.log(err))
    });

  router.get("/uno/:id", (req, res) => {
    const createGames = 
    `INSERT INTO games(creator_id)
    VALUES($1)
    RETURNING *;`;
    const startingHand = `INSERT INTO creator_hand (card_id)
    SELECT id
    FROM cards 
    ORDER BY random() 
    LIMIT 7;`
    Promise.all([
      db.query(createGames, [req.cookies.userID]),
      db.query(startingHand)
    ])
    .then(response => console.log(response))
    db.query(`
        INSERT INTO creator_hand (card_id)
        SELECT id
        FROM cards 
        ORDER BY random() 
        LIMIT 7;
    `)
    .then ((response) => {
        res.render("gameID", {cards: []})
    })
    .catch (err => console.log(err))
    });
    
  router.post("/uno/:id", (req, res) => {
      db.query(`
      UPDATE games
      SET opponent_id = $1
      WHERE id = $2
      RETURNING *;
      `, [req.cookies.userID, req.params.id])
      .then ((res) => {
        return res.rows
      })
      .then (res.redirect("/"))
      .catch ((err) => {
        console.log(err)
    })
  })

  router.post("/uno", (req, res) => {
    db.query(`
    INSERT INTO games (creator_id)
    VALUES($1)`, [req.cookies.userID])
    db.query(`
    INSERT INTO creator_hand (card_id, image_url)
    SELECT id, image_url
    FROM cards 
    ORDER BY random() 
    LIMIT 7
    RETURNING *;
    `)
    .then((response) => {
      res.render("gameID", {cards: response.rows})
    })
  .catch(err => console.log(err))
  })

  return router;
}