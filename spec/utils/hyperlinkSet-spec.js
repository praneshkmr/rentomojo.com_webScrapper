var hyperlinkSet = require("../../app/utils/hyperlinkSet");

describe("Singleton Hyperlink Set", function () {
  it("should store only unique strings", function () {
    var rootLink = hyperlinkSet.hasHyperLink('/');
    expect(rootLink).toBe(true);

    var anotherLink = hyperlinkSet.hasHyperLink('/abc');
    expect(anotherLink).toBe(false);
  });

  it("should add only unique string values", function () {
    var firstLink = hyperlinkSet.hasHyperLink('/xyz');
    expect(firstLink).toBe(false);

    hyperlinkSet.addHyperlink('/xyz');

    var sameLink = hyperlinkSet.hasHyperLink('/xyz');
    expect(sameLink).toBe(true);
  });
});
