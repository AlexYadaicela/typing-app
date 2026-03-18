import app from "../app.js";
import getChai from "../utils/getChai.util.js";

describe("test mutiply api", function () {
  it("should multiply two numbers", async () => {
    const { expect, request } = await getChai();
    const req = request
      .execute(app)
      .get("/multiply")
      .query({ first: 7, second: 6 })
      .send();
    const res = await req;
    expect(res).to.have.status(200);
    expect(res).to.have.property("body");
    expect(res.body).to.have.property("result");
    expect(res.body.result).to.have.equal(42);
  });
});
