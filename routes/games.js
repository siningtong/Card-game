const express = require('express');
const router  = express.Router();

module.exports = function (db) {

    router.get("/uno", (req, res) => {
        res.render("uno");
      });

    router.get("/uno/1", (req, res) => {
        res.render("gameID");
      });
    

    router.post("/uno/1", (req, res) => {
      console.log("entered unoGame post request!")
      return db.query(`
      INSERT INTO games(creator_id, turn, active)
      VALUES(1, 1, true)
      RETURNING *;
      `)
      .then (res => res.rows)
      .then (res.render("gameID"))
      .catch(err => console.log(err))
    });

    return router;
}