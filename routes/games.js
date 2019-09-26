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
    const gameID = req.params.id
    res.render("gameID",{gameID})
    .catch (err => console.log(err))});
    
  router.post("/uno", (req, res) => {
    gameHelpers.newGame(req.cookies.userID, req.params.userID)
    .then(cards => {
      console.log('Game creator card:', cards);
      res.render("gameID", {cards, gameID: req.params.id})
    })
  })

  router.post("/api/uno", (req, res) => {
    gameHelpers.newGame(req.cookies.userID, req.params.userID)
    .then(cards => {
      console.log('Game creator card:', cards);
      res.json({cards})
    })
  })
    
  router.post("/uno/:id", (req, res) => {
    gameHelpers.joinGame(req.cookies.userID, req.params.id)
    .then (cards => {
      //  console.log('Game Joiner card:', cards);
      res.render("gameID", {cards, gameID: req.params.id})
    })
  })
//playcard router
  router.post("/uno/:id/playcard",(req,res)=>{
    gameHelpers.joinGame(req.cookies.userID)
    .then(response => {
      res.send(response)
    })
  })

  return router;
}
