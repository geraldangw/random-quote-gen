  var test = true;
$(function() {
  //var declarations for DOM elements

  var $quoteOutPut = $('#quoteoutput');
  var $contentOutPut = $('#contentoutput');
  var $defaultText = $('.defaultText');
  var $submitbtn = $('#submitbtn');
  var $loader = $('.loader');
  var $weather = $('#weather');
  var $team = $('#team');

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
      $loader.hide();
      $('<h3>'+ data.name + ', ' + data.sys.country + '</h3>').appendTo($weather);
      $('<p>Main Temperature: ' + data.main.temp + ' celcius</p>').appendTo($weather);
      $('<p>Max Temperature: ' + data.main.temp_max + ' celcius </p>').appendTo($weather);
      $('<p>Min Temperature: ' + data.main.temp_min + ' celcius</p>').appendTo($weather);
      $('<p>Cloudiness: ' + data.clouds.all + ' % '+ '</p>').appendTo($weather);
    }

    function failFunction(request, textStatus, errorThrown) {
      // hide the list and show the corresponding message
      $weather.html('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
    }

    //Drawing from our ServeAPI for team details

    $.ajax({
      url: 'https://morning-temple-91235.herokuapp.com/users',
      type: 'GET',
      datatype: 'JSON',
    }).done(function(data) {
        $('<h4> Done By </h4>').appendTo($team);
        for (var i = 0; i < data.length; i++) {
          $(' <p> ' + data[i].name + "    |    " + data[i].age + "     |     " +  "<a href=\"" + data[i].email + "\"> MAIL </a> </p>").appendTo($team);
        }
    })
    .fail(function(request, textStatus, errorThrown){
      $( '<p class="outputtext">An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + '</p>' ).appendTo($quoteOutPut);
    });

      //click
      $submitbtn.on('click', function(e){
        e.preventDefault();
        $(".outputtext").remove();
        // $(".outputtext").remove();
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
          $defaultText.remove();
          $( '<h3 class="outputtext">' + data.quote + '</h3>' ).appendTo($quoteOutPut);
          $( '<p class="outputtext">' + ' - ' + data.author + '</p>' ).appendTo($quoteOutPut);
          $.ajax({
              type: "GET",
              url: "https://en.wikipedia.org/w/api.php?callback=?",
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
                  $( '<a class="outputtext" href="' + data[3][i] + '">' + '<p class="outputtext">Wiki Output Title: '  + data[1][i] + ' ' + '</p></a>' + '<p class="outputtext">' + data[2][i] + '</p>').appendTo($contentOutPut);
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
