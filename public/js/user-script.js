$('#point').hide();
$(".point").click(function(){
    $('.dashboard').removeClass('active');
    $('.point').addClass('active');
    $("#dashboard").slideUp("slow");
    $('#point').slideDown("slow");

  });
  $(".dashboard").click(function(){
    $('.point').removeClass('active');
    $('.dashboard').addClass('active');
    $('#point').slideUp("slow");
    $("#dashboard").slideDown("slow");
    
  });


  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
