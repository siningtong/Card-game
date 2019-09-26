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
      gameHelpers.updateCards1(req.params.id)
      .then(cards => {
        res.send("it worked")
      })
    })
  
  router.post("/uno/:id/start", (req, res) => {
    gameHelpers.updateCards1(req.params.id)
    .then(cards => {
      res.json({cards, gameID: req.params.id})
    })
  })

  router.post("/uno/new", (req, res) => {
    gameHelpers.newGame(req.cookies.userID, req.params.id)
    .then(cards => {
      res.render("gameID", {cards, gameID: req.params.id})
    })
  })
    
  router.post("/uno/:id", (req, res) => {
    gameHelpers.joinGame(req.cookies.userID, req.params.id)
    .then (cards => {
      res.render("gameID", {cards, gameID: req.params.id})
    })
  })
  
  router.post("/uno/:id/card", (req, res) => {
    gameHelpers.newCard(req.cookies.userID)
      .then((response) => {
        // console.log(response)
        res.json({card: response, gameID: req.params.id})
      })
  })

  return router;
}
