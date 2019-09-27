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
    .then(() => {
      res.redirect("/games/uno")
    })
  })
    
  router.post("/uno/:id", (req, res) => {
    gameHelpers.getDeck()
    .then((cards) => {

      res.send(cards)
    })
  })

  return router;
}
