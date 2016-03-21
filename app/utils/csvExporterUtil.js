var fs = require('fs');

var csvExporterUtil = {};

csvExporterUtil.appendLinksToCSVFile = function (links, callback){
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

module.exports = csvExporterUtil;
