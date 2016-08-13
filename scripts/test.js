
describe('checking if', function() {
  it('tests are running', function(){
    expect(test).toBe(true);
  });
});

describe('check that APIs are working', function(){
  describe('Random Quote Generator API', function(){

    it('should send a successful request (receive response) to API', function(){
      // expect data not to be empty
    });
  });//end of random quote check

  describe('Wikipedia API', function()  {

    it('should send a successful request (receive response) to API', function(){
      // expect data not to be empty
    });

    it('should display an unavailable message when nil data from search', function(){

    });
  });//end of wikipedia check

  describe('Pulling from own server', function()  {

    it('should send a successful request (receive response) to API', function(){
      // expect data not to be empty
    });

    it('should be status code 404 when data does not exist', function(){

    });
  });//end of server check
});//end of check that APIs are working

describe('submit button is working', function() {

});
