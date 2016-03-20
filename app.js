var request = require('request');

var jsdom = require("jsdom");
var window = jsdom.jsdom().defaultView;

//var $=require('jquery');

var options = {
  url: 'https://www.rentomojo.com/?_escaped_fragment_',
  headers: {
    'User-Agent': 'Node.js Scraper'
  }
};

var fs = require('fs');
var body = fs.readFileSync("./body.txt", "utf-8");
findHyperlinks(body, function(err, links) {
  if (err) {
    console.log(err);
  }
  else {
    console.log(links);
  }
});

//$("<h1>test passes</h1>").appendTo("body");
//console.log($("body").html());

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    //$(body).appendTo("body");
    //console.log($("body").html());

  }
}

function findHyperlinks(html, callback){
  jsdom.jQueryify(window, "./jquery.js", function () {
    var $ = window.$;
    var anchors = $(html).find("a");
    var links = [];
    anchors.each(function( index ) {
      var link = $( this ).attr("href");
      if(link != undefined){
        links.push(link);
      };
    });
    callback(null,links);
  });
}

//request(options, callback);
