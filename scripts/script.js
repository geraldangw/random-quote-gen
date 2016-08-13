  var test = true;
$(function() {
  //var declarations for DOM elements

  var $quoteOutPut = $('#quoteoutput');
  var $submitbtn = $('#submitbtn');
  var $loader = $('.loader');
  var $weather = $('#weather');


// Weather Ajax

  $.ajax({
    // where the data live
    url: 'http://api.openweathermap.org/data/2.5/weather?q=Singapore&units=metric&APPID=24801b8eecaa5f34812e5e8f1d25b62d',
    type: 'GET',
    // what is their type
    dataType: 'JSON',
    // show the loader before making the request
    beforeSend: function(xhr) {
      $loader.show();
    },

  }).done(successFunction)
    .fail(failFunction);
  //.always(alwaysFunction);


  function successFunction(data) {
    console.log('in successFunction');
    // To display degree Celius"&#8451;"

    console.log(data);
    console.log('Country name: ' + data.name );
    console.log('Country code: ' + data.sys.country );
    console.log('Main Temperature: ' + data.main.temp );
    console.log('Max Temperature: ' + data.main.temp_max );
    console.log('Min Temperature: ' + data.main.temp_min );
    console.log('Cloudiness: ' + data.clouds.all + ' % ');



    $loader.hide();
    $('<p>Country name: ' + data.name + '</p>').appendTo($weather);
    $('<p>Country code: ' + data.sys.country + '</p>').appendTo($weather);
    $('<p>Main Temperature: ' + data.main.temp + '</p>').appendTo($weather);
    $('<p>Max Temperature: ' + data.main.temp_max + '</p>').appendTo($weather);
    $('<p>Min Temperature: ' + data.main.temp_min + '</p>').appendTo($weather);
    $('<p>Cloudiness: ' + data.clouds.all + ' % '+ '</p>').appendTo($weather);
  }

  function failFunction(request, textStatus, errorThrown) {
    // hide the list and show the corresponding message
    $weather.html('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
  }



  //click
  $submitbtn.on('click', function(e){
    console.log('clicked');
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
          // /w/api.php?action=query&format=json&prop=extracts&titles=Main+Page&exintro=1&explaintext=1
          contentType: "application/json;",
          data: "action=opensearch&search=" + encodeURIComponent(data.author) + "&format=json",
          // data: "prop=text&format=json&section=0&page=" + encodeURIComponent(data.author) + "&action=parse",
          async: false,
          dataType: "json",
          success: function (data, textStatus, jqXHR) {
            console.log(data[1]);
            for (var i = 0; i < data[1].length; i++) {
              $( '<a href="' + data[3][i] + '">' + '<p class="outputtext">Wiki Output Title: '  + data[1][i] + ' ' + '</p></a>' + '<p>' + data[2][i] + '</p>').appendTo($quoteOutPut);
            }
      },
    }).fail(function(request, textStatus, errorThrown){
      $loader.hide();
      $( '<p class="outputtext">An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + '</p>' ).appendTo($quoteOutPut);
      console.log(data);
      console.log(data.author);
    }); //end of .fail
  }); //end of .done
});//end of submit
});
