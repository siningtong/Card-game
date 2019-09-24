/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser')
const app= express()
app.use(cookieParser())

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
        .then ((data) => {
         const user = data.rows[0]
         res.cookie('userID',user.id)
         res.redirect("/")
        })
        .catch (err => 
          console.log(err))
  })



//check uesername and passeord
//server.js will add /users before /login
router.post('/login', (req, res) => {
  console.log('hello')
  return db.query(`
  select * from users
  where username = $1;
  `, [req.body.username])
    .then(data => {
      const user = data.rows[0];
      if(user) {
        if (user.password === req.body.password){
          res.cookie('userID',user.id);
          res.redirect('/')
        } else {
          res.send('Bad request')
        }
      }
      else{
        res.send('Bad request')
      }
    })
    // .then(()=>{
    //   console.log('log in success')
    // })
    .catch(erro => console.log(erro))
});
router.post('/logout', (req,res) => {
  res.clearCookie('userID');
  res.redirect('/');
});








return router;

};
