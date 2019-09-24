/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
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
  router.get("/login", (req, res) => {
    res.render("login");
  });


router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/highscores", (req, res) => {
  db.query(`
    SELECT games.*, users.username
    FROM games
    JOIN users ON users.id = creator_id
    GROUP BY games.id, users.id
    ORDER BY games.id;
  `)
  .then((response) => {
      res.render("highscores", {games: response.rows})
    })
  .catch(err => console.log(err))
  })

///////////////////
// POST REQUESTS //
///////////////////


  router.post("/register", (req, res) => {
    return db.query(`
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING *;
    `, [req.body.username, req.body.password])
    .then ((res) => {
      return res.rows[0]
    })
    .then (res.redirect("/"))
    .catch (err => 
      console.log(err))
  })



//check uesername and passeord
//server.js will add /user before /login
router.post('/login', (req, res) => {
  return db.query(`
  select * from users
  where username = $1 and password = $2;
  `, [req.body.username, req.body.password])
    .then(data => {
      const user = data.rows;
      res.redirect('/')
      // res.json({ user });
    })
    .catch(erro => console.log(erro))
});








return router;

};
