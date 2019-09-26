$(() => {
  // registeringClickDeckHandler()
  // registeringClickGameHandler()
  // registeringClickStartHandler()
  playCard()
});
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

const user = getCookie('userID')

function registeringClickDeckHandler() {
  $("img.deck").click(function (event) {
    event.preventDefault()
    const card = $(this);
    const url = card.attr("action");
    const gameID = $("#hidden-input").attr("value");
    console.log(gameID)

    $.ajax({
      type: 'POST',
      url: url,
      data: card,
      success: function() {   
        location.reload();  
      }
    })
  })
}

function registeringClickGameHandler() {
  $("#new-game").submit(function (event) {
    event.preventDefault();
    const game = $(this);
    const numGames = $(".game").length
    const url = game.attr("action");

    $.ajax({
      type: 'POST',
      url: url,
      data: game,
      success: function() {   
        location.reload();
      }
    })
  })
}

function registeringClickStartHandler() {
  $("#start").submit(function (event) {
    event.preventDefault();
    const deck = $(this);
    console.log(deck)
    const url = deck.attr("action");

    // $.ajax({
    //   type: 'POST',
    //   url: url,
    //   data: game,
    //   success: function() {   
    //     location.reload();
    //   }
    // })
  })
}

function playCard() {
  $(".card").click(function () {
    $(".current-card").attr("src", $(this).attr("src"));
    $(this).remove();

  })
};