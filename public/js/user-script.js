$('#form-login').hide();
$(".signup-button").click(function(){
    $("#form-login").slideUp("slow");
    $('#form-signup').slideDown("slow");
  });
  $(".login-button").click(function(){
    $('#form-signup').slideUp("slow");
    $("#form-login").slideDown("slow");
    
  });

