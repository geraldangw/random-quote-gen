$(function() {

  //var declarations for DOM elements
  var $quoteOutPut = $('#quoteoutput');
  var $submitbtn = $('#submitbtn');
  var $loader = $('.loader');

  //click
  $submitbtn.on('click', function(e){
    e.preventDefault();
    $(".outputtext").remove();
    $(".outputtext").remove();
    //ajax
    $.ajax({
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
      dataType: 'json',
      beforeSend: function(xhr) {
        $loader.show();
        xhr.setRequestHeader('X-Mashape-Key', 'YpxfYwYFvlmshzZFBd2DC10ufIwKp1SjBInjsnDFkfR1I32B7a');
      },
    }).done(function(data){
      $loader.hide();
      $( '<p class="outputtext">' + data.quote + '</p>' ).appendTo($quoteOutPut);
      $( '<p class="outputtext">' + ' - ' + data.author + '</p>' ).appendTo($quoteOutPut);
      // $quoteOutPut.html(data.quote);
      // $quoteOutPut.html(data.author);
      //front end rendering
      // console.log("API Success");
    }).fail(function(request, textStatus, errorThrown){
      $loader.hide();
      $( '<p class="outputtext">An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown + '</p>' ).appendTo($quoteOutPut);
      // console.log("API Fail");
      //front end rendering
    });
  });

});
