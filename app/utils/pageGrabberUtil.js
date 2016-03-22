var request = require('request');

var PageGrabber = {};

PageGrabber.getRenderedHTML = function (url, callback) {
  var options = {
    url: 'https://www.rentomojo.com' + url + '?_escaped_fragment_',
    headers: {
      'User-Agent': 'Node.js Scraper'
    }
  };

  function requestCallback(error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, body);
    }
    else if(error){
      callback(error);
    }
    else{
      console.log("response code : "+response.statusCode);
      callback("Non success response code");
    }
  };

  request(options, requestCallback);
}

module.exports = PageGrabber;
