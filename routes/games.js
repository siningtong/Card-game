const express = require('express');
const router  = express.Router();

module.exports = function (db) {

  router.get("/uno", (req, res) => {
    db.query(`
    SELECT *
    FROM games
  `)
  .then((response) => {
    console.log("games", response.rows[0].id)
      res.render("uno", {games: response.rows})
    })
  .catch(err => console.log(err))
    });

  router.get("/uno/:id", (req, res) => {
    res.render("gameID")
    });
    
  router.post("/uno/:id", (req, res) => {
    console.log("about to join this game!")
      db.query(`
      UPDATE games
      SET opponent_id = $1
      WHERE id = $2
      RETURNING *;
      `, [3, req.params.id])
      .then ((res) => {
        return res.rows
      })
      .then (res.send("it worked!"))
      .catch ((err) => {
        console.log(err)
    })
  })

  router.post("/uno", (req, res) => {
    console.log("entered unoGame post request!")
    return db.query(`
    INSERT INTO games(creator_id)
    VALUES($1)
    RETURNING *;
    `, [1])
    .then (res => res.rows)
    .then (res.render("gameID"))
    .catch(err => console.log(err))
  });

  return router;
}