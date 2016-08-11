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
      $.ajax({
          type: "GET",
          url: "http://en.wikipedia.org/w/api.php?callback=?",
          // url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Jimi_Hendrix&callback=?",
          //http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=Stack%20Overflow
          contentType: "application/json;",
          data: "prop=text&format=json&section=0&page=" + encodeURIComponent(data.author) + "&action=parse",
          async: false,
          dataType: "json",
          success: function (data, textStatus, jqXHR) {
            console.log(data);
        $( '<p class="outputtext">An error occurred during your request: '  + data + ' ' + '</p>' ).appendTo($quoteOutPut);
      },

      // $quoteOutPut.html(data.quote);
      // $quoteOutPut.html(data.author);
      //front end rendering
      // console.log("API Success");
    })
    // .fail(function(request, textStatus, errorThrown){
    //   $loader.hide();
    //   $( '<p class="outputtext">An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + '</p>' ).appendTo($quoteOutPut);
    //   console.log(data);
    //   console.log(data.author);
    // }); //end of .fail
  }); //end of .done
});//end of submit
});
