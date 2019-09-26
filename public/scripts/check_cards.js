$(document).ready(function(){

  // when page loads keep track of hand
  const defaultCurrentCard = {
    value: '8',
    colour: 'green'
  }
  $('.uno-card').on('click',function(event){
    // event.target.color
    // event is the div -> card id
    event.preventDefault();

    const card = $(this);

    console.log(card.data('colour'), card.data('value'))
    if(event.target.colour !== defaultCurrentCard.colour || event.target.value !== defaultCurrentCard.value){
      
      return false
    }
    else{
      $.ajax({
        type:'POST',
        url:'/uno/:id/playcard',
        data:{colour:card.data('colour'),value:card.data('value')}
      })

    }
    
  })
})


const currentCards = function(){
  db.query(`
  select * from decks
  
  `)
}