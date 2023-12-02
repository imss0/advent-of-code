const getTwoDigits = require(".");

describe("getTwoDigits", function () {
  it("should return two digits from string", () => {
    expect(getTwoDigits("vqjvxtc79mvdnktdsxcqc1sevenone")).toBe(72);
    expect(getTwoDigits("vsskdclbtmjmvrseven6")).toBe(66);
    expect(getTwoDigits("8jkfncbeight7seven8")).toBe(88);
    expect(getTwoDigits("six8dbfrsxp")).toBe(88);
    expect(getTwoDigits("2zpcbjdxcjfone68six")).toBe(28);
  });
});
