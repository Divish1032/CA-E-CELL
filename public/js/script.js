


$(document).ready(function() {
    $('.1 a').click(function(e) {
      e.preventDefault();
  
      $('html, body').animate({
        scrollTop: $('.second').offset().top
      }, 500);
    });
    $('.2 a').click(function(e) {
        e.preventDefault();
    
        $('html, body').animate({
          scrollTop: $('.fourth').offset().top
        }, 500);
    });
    $('.3 a').click(function(e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $('.seventh h1').offset().top
        }, 500);
    });
    $('.4 a').click(function(e) {
        e.preventDefault();
    
        $('html, body').animate({
          scrollTop: $('.sixth').offset().top
        }, 500);
      });
  });

