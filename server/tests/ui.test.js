import app from "../app.js";
import getChai from "../utils/getChai.util.js";

describe("test getting a page", function () {
  it("should get the index page", async () => {
    const { expect, request } = await getChai();
    const res = await request.execute(app).get("/").send();
    expect(res).to.have.status(200);
    expect(res).to.have.property("text");
    expect(res.text).to.include("Click this link");
  });
});
