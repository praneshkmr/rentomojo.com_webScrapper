var readlineSync = require('readline-sync');

var scrapperSync = require('./app/services/scrapperSync');
var scrapperAsync = require('./app/services/scrapperAsync');

console.log("Enter which mode to scrap website");
console.log("1. Without Async Library");
console.log("2. With Async Library");

var answer = readlineSync.questionInt('Type a number : ');
if(answer == 1){
  scrapperSync();
}
else if(answer == 2){
  scrapperAsync();
}
else{
  console.log("Invalid Choice");
}
