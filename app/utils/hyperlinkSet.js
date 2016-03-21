var Set = require("collections/set");
var instance = new Set(["/"]);

module.exports = {
  hasHyperLink : function(link){
    return instance.has(link);
  },
  addHyperlink : function(link){
    instance.add(link);
  }
};

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
