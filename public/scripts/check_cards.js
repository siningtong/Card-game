$(document).ready(function(){

  // when page loads keep track of hand
  $('.uno-card').on('click',function(event){
    // const card = $(this);
    console.log($(".current-card img").data('colour'),$(".current-card img").data('value'))

    console.log(($(this).data('colour')), $(this).data('value'))
    if(($(this).data('colour')) === ($(".current-card img").data('colour')) || ($(this).data('value')) === ($(".current-card img").data('value')) ||$(this).data('colour') === 'black'){  
    $(".current-card img").attr("src",($(this).attr("src")))
    $(this).remove();
    }
      // $.ajax({
      //   type:'POST',
      //   url:'/uno/:id/playcard',
      //   data:{colour:card.data('colour'),value:card.data('value')}
      // })
  })
 
})