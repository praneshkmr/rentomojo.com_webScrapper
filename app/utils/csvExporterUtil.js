var fs = require('fs');

var csvExporterUtil = {};

csvExporterUtil.appendLinksToCSVFile = function (links, callback){
  var count = 0;
  links.forEach(function(link){
    fs.appendFile('linksSync.csv', link + '\n' , function (err) {
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

csvExporterUtil.appendLinkToCSVFile = function (link, callback){
  fs.appendFile('linksAsync.csv', link + '\n' , function (err) {
    if(err){
      callback(err);
    }
    else{
      callback(null,link);
    }
  });
}

module.exports = csvExporterUtil;
