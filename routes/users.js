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

///////////////////
// POST REQUESTS //
///////////////////


  router.post("/register", (req, res) => {
      console.log("user")
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

  console.log('hello')
  console.log(req.body.username);
  let username = req.body.username;
  let found = null;

  return db.query(`
  select * from users
  where username = $1 and password = $2;
  `, [req.body.username, req.body.password])
    .then(data => {
      const user = data.rows;
      console.log("user id = " + user.id);
      res.redirect('/')
      // res.json({ user });
    })
    .then(()=>{
      console.log('log in success')
    })
    .catch(err => console.log(err))
});



return router;

};
