var request = require('request');

function getRenderedHTML(url, callback) {
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
  };

  request(options, requestCallback);
}

var jsdom = require("jsdom");
var window = jsdom.jsdom().defaultView;

var fs = require('fs');

getRenderedHTML('/', function(err, body) {
  if (err) {
    console.log(err);
  }
  else {
    findHyperlinks(body, function(err, links) {
      if (err) {
        console.log(err);
      }
      else {
        getInternalLinks(links, function(err, internalLinks) {
          if (err) {
            console.log(err);
          }
          else {
            getUniqueLinks(internalLinks, function(err, uniqueLinks) {
              if (err) {
                console.log(err);
              }
              else {
                appendLinksToCSVFile(uniqueLinks, function(err) {
                  if (err) {
                    console.log(err);
                  }
                  else{
                    
                  }
                });
              }
            });
          }
        });
      }
    });
  }
});

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

function getInternalLinks(links, callback) {
  var internalLinks = [];
  links.forEach(function(link){
    var firstChar = link.substring(0,1);
    if(firstChar === "/"){
      internalLinks.push(link);
    }
  });
  callback(null,internalLinks);
}

var HyperlinksSet = (function () {
  var Set = require("collections/set");
  var instance = new Set(["/"]);

  return {
    hasHyperLink : function(link){
      return instance.has(link);
    },
    addHyperlink : function(link){
      instance.add(link);
    }
  }
})();

// Unit Tests for HyperlinksSet
//
// HyperlinksSet.hasHyperLink("/", function (err, hasHyperLink) {
//   console.log(hasHyperLink);
// });
//
// HyperlinksSet.hasHyperLink("/asa", function (err, hasHyperLink) {
//   console.log(hasHyperLink);
//   HyperlinksSet.addHyperlink("/asa", function (err, hasHyperLink) {
//     console.log(hasHyperLink);
//     HyperlinksSet.hasHyperLink("/asa", function (err, hasHyperLink) {
//       console.log(hasHyperLink);
//     });
//   });
// });

function getUniqueLinks(links, callback) {
  var uniqueLinks = [];
  links.forEach(function(link){
    var hasHyperLink = HyperlinksSet.hasHyperLink(link);
    if (!hasHyperLink) {
      uniqueLinks.push(link);
      HyperlinksSet.addHyperlink(link);
    }
  });
  callback(null, uniqueLinks);
};

function appendLinksToCSVFile(links, callback){
  var count = 0;
  links.forEach(function(link){
    fs.appendFile('links.csv', link + '\n' , function (err) {
      if(err){
        callback(err);
      }
      else{
        count += 1;
      }
      if(count == links.length){
        callback(null);
      }
    });
  });
}
