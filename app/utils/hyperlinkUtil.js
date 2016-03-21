var jsdom = require("jsdom");
var window = jsdom.jsdom().defaultView;

var HyperlinkSet = require("./hyperlinkSet");

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

HyperlinkUtil.getUniqueLinks = function (links, callback) {
  var uniqueLinks = [];
  links.forEach(function(link){
    var hasHyperLink = HyperlinkSet.hasHyperLink(link);
    if (!hasHyperLink) {
      uniqueLinks.push(link);
      HyperlinkSet.addHyperlink(link);
    }
  });
  callback(null, uniqueLinks);
};

module.exports = HyperlinkUtil;
