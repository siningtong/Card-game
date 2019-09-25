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

  router.get("/uno/:id", (req, res) => {  
    res.render("gameID")
    .catch (err => console.log(err))
    });
    
  router.post("/uno", (req, res) => {
    gameHelpers.newGame(req.cookies.userID, req.params.userID)
    .then(cards => {
      res.render("gameID", {cards})
    })
  })
    
  router.post("/uno/:id", (req, res) => {
    gameHelpers.joinGame(req.cookies.userID, req.params.id)
    gameHelpers.updateCards()
    gameHelpers.updateCards1()
    .then (cards => {
      console.log(cards)
      res.render("gameID", {cards})
    })
  })

  return router;
}
