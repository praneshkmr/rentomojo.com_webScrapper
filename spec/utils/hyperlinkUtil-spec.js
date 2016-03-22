var hyperlinkUtil = require("../../app/utils/hyperlinkUtil");

describe("Hyperlink Util - findHyperlinks", function () {
  it("should find hyperlinks from a html content", function () {
    var html = "<a href='/abc'>ABC</a><h1>hello</h1><a href='/xyz'>XYZ</a>";
    hyperlinkUtil.findHyperlinks(html, function (err, links) {
      expect(links).toBe(['/abc','/xyz']);
    });
  });
});

describe("Hyperlink Util - getInternalLinks", function () {
  it("should filter only Internal hyperlinks", function () {
    var links = ['/bangalore','https://www.facebook.com/blah','/delhi']
    hyperlinkUtil.getInternalLinks(links, function (err, internalLinks) {
      expect(internalLinks).toEqual([ '/bangalore', '/delhi' ]);
    });
  });
});
