/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

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

  router.get("/login", (req, res) => {
    res.render("login");
  });


router.get("/register", (req, res) => {
  res.render("register");
});

///////////////////
// POST REQUESTS //
///////////////////


//check uesername and passeord
//server.js will add /user before /login
router.post('/login', (req, res) => {
  console.log('hello')
  return db.query(`
  select * from users
  where username = $1 and password = $2;
  `, [req.body.username, req.body.password])
    .then(data => {
      const user = data.rows;
      res.redirect('/')
      // res.json({ user });
    })
    .then(()=>{
      console.log('log in success')
    })
    .catch(erro => console.log(erro))
});






return router;
};
