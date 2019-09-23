/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

//////////////////
// GET REQUESTS //
//////////////////

  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/uno", (req, res) => {
    res.render("uno");
  });
  
  router.get("/login", (req, res) => {
    res.render("login");
  });
  
  router.get("/register", (req, res) => {
    res.render("register");
  });

  router.get("/unoGame", (req, res) => {
    res.render("unoGame");
  });

///////////////////
// POST REQUESTS //
///////////////////


  // router.post("/unoGame", (req, res) => {
  //   console.log("entered unoGame post request!")
  //   return pool.query(`
  //   INSERT INTO games(creator_id)
  //   VALUES($1)
  //   RETURNING *;
  //   `)
  //   .then (res => res.rows)
  //   .catch(err => null)
    
  // });






  return router;
};
