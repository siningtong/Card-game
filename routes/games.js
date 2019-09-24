const express = require('express');
const router  = express.Router();

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
    res.render("gameID")
    });
    
  router.post("/uno/:id", (req, res) => {
      db.query(`
      UPDATE games
      SET opponent_id = $1
      WHERE id = $2
      RETURNING *;
      `, [4, req.params.id])
      .then ((res) => {
        return res.rows
      })
      .then (res.send("it worked!"))
      .catch ((err) => {
        console.log(err)
    })
  })

  router.post("/uno", (req, res) => {
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