var pageGrabberUtil = require("../../app/utils/pageGrabberUtil");
var hyperlinkUtil = require("../../app/utils/hyperlinkUtil");
var csvExporterUtil = require("../../app/utils/csvExporterUtil");

function recursiveBusinessLogic(path) {
  pageGrabberUtil.getRenderedHTML(path, function(err, body) {
    if (err) {
      console.log(err);
    }
    else {
      hyperlinkUtil.findHyperlinks(body, function(err, links) {
        if (err) {
          console.log(err);
        }
        else {
          hyperlinkUtil.getInternalLinks(links, function(err, internalLinks) {
            if (err) {
              console.log(err);
            }
            else {
              hyperlinkUtil.getUniqueLinks(internalLinks, function(err, uniqueLinks) {
                if (err) {
                  console.log(err);
                }
                else {
                  csvExporterUtil.appendLinksToCSVFile(uniqueLinks, function(err) {
                    if (err) {
                      console.log(err);
                    }
                    else{
                      processNextLevelPaths(uniqueLinks, function (err) {

                      });
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
}

function processNextLevelPaths(links, callback){
  links.forEach(function(link){
    recursiveBusinessLogic(link);
  });
};

module.exports = function () {
  recursiveBusinessLogic('/');
}
