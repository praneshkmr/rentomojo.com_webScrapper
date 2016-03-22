var request = require('request');
var throttledRequest = require('throttled-request')(request);

var MAX_REQUESTS = 5;

throttledRequest.configure({
  requests: MAX_REQUESTS,
  milliseconds: 1000
});

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
      callback("Non success response code : ",response.statusCode);
    }
  };

  console.log("Fetching ",url);
  throttledRequest(options, requestCallback);
}

module.exports = PageGrabber;
