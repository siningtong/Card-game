$(document).ready(function(){

  // when page loads keep track of hand
  $('.testDiv').on('click',function(event){
    // const card = $(this);
    console.log($(".middleCard").data('colour'),$(".middleCard").data('value'))

    console.log(($(this).data('colour')), $(this).data('value'))

    if(($(this).data('colour')) === ($(".middleCard").data('colour')) || ($(this).data('value')) === ($(".middleCard").data('value')) ||$(this).data('colour') === 'black'){  
      $(this).parent().remove();
      $(".middleCard").replaceWith(this);
      $(this).attr("class", "middleCard");
      
    }







      // $.ajax({
      //   type:'POST',
      //   url:'/uno/:id/playcard',
      //   data:{colour:card.data('colour'),value:card.data('value')}
      // })
  })
 
})