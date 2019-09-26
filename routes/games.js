const express = require('express');
const router = express.Router();

module.exports = function (gameHelpers) {
  router.get("/uno", (req, res) => {
    gameHelpers.getAllGames()
    .then(games => {
      res.render("uno", {games})
    })
  .catch(err => console.log(err))
    });

  router.post("/uno/new", (req, res) => {
    gameHelpers.newGame(req.cookies.userID, req.params.id)
    .then(response => {
      res.render("gameID", {cards, gameID: req.params.id})
    })
  })
    
  router.post("/uno/:id", (req, res) => {
    gameHelpers.getDeck()
    .then((cards) => {
      res.render("gameID", {cards, gameID: req.params.id})
    })
  })

  return router;
}
