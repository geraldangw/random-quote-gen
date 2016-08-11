
$(function() {

  var test = true;

  //var declarations for DOM elements

  var $quoteOutPut = $('#quoteoutput');
  var $submitbtn = $('#submitbtn');
  var $loader = $('.loader');

  //click
  $submitbtn.on('click', function(e){
    e.preventDefault();
    //ajax
    $.ajax({
      url: "https://andruxnet-random-famous-quotes.p.mashape.com/",
      datatype: 'json',
      beforeSend: function(xhr) {
        $loader.show();
        xhr.setRequestHeader('X-Mashape-Key', 'YpxfYwYFvlmshzZFBd2DC10ufIwKp1SjBInjsnDFkfR1I32B7a');
      },
    }).done(function(data){
      $loader.hide();
      //front end rendering
      console.log('API Success');
    }).fail(function(request, textStatus, errorThrown){
      $loader.hide();
      console.log("API Fail");
      //front end rendering
    });
  });

});
