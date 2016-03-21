var jsdom = require("jsdom");
var window = jsdom.jsdom().defaultView;

var HyperlinkUtil  = {};

HyperlinkUtil.findHyperlinks = function (html, callback){
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

HyperlinkUtil.getInternalLinks = function (links, callback) {
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

HyperlinkUtil.getUniqueLinks = function (links, callback) {
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

module.exports = HyperlinkUtil;
