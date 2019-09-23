const express = require('express');
const router  = express.Router();
const { Pool } = require('pg');
const db = new Pool();


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
      INSERT INTO games(creator_id)
      VALUES(1)
      RETURNING *;
      `)
      .then (res => res.rows[0])
      .catch(err => null)
      console.log("hi");
      // res.render("gameID");
    });

    return router;
}