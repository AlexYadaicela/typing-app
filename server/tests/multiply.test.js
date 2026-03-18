import { multiply } from "../utils/multiply.util.js";
import getChai from "../utils/getChai.util.js";

describe("testing multiply", () => {
  it("should give 7 * 6 is 42", async () => {
    const { expect } = await getChai();
    expect(multiply(7, 6)).to.equal(42);
  });
  it("should give 7 * 6 is 97", async () => {
    const { expect } = await getChai();
    expect(multiply(7, 6)).to.equal(97);
  });
  it("should give 1 * 2 is 7", async () => {
    const { expect } = await getChai();
    expect(multiply(1, 2)).to.equal(7);
  });
  it("should give 3 * 3 is 9", async () => {
    const { expect } = await getChai();
    expect(multiply(3, 3)).to.equal(9);
  });
});
