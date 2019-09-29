
$('.card').mouseover(function() {
  $('.card_temp').removeClass('card_temp')
})

$(document).ready(function() {
    $('.1').click(function(e) {
      e.preventDefault();
  
      $('html, body').animate({
        scrollTop: $('.second').offset().top
      }, 500);
    });
    $('.2').click(function(e) {
        e.preventDefault();
    
        $('html, body').animate({
          scrollTop: $('.fourth').offset().top
        }, 500);
    });
    $('.3 ').click(function(e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $('.seventh h1').offset().top
        }, 500);
    });
    $('.4').click(function(e) {
        e.preventDefault();
    
        $('html, body').animate({
          scrollTop: $('.sixth').offset().top
        }, 500);
      });
  });

  