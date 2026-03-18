import app from "../app.js";
import { seed_db, testUserPassword } from "../utils/seedDB.util.js"; // 👈 fixed extension
import getChai from "../utils/getChai.util.js";
import mongoose from "mongoose";
import connectDB from "../db/connection.js";

describe("tests for typing text CRUD", function () {
  const ctx = {
    token: null,
    user: null,
    textId: null,
  };

  before(async () => {
    await connectDB(process.env.MONGO_URI_TEST);

    ctx.user = await seed_db();

    const { expect, request } = await getChai();
    const res = await request
      .execute(app)
      .post("/api/v1/auth/login")
      .set("content-type", "application/json")
      .send({
        email: ctx.user.email,
        password: testUserPassword,
      });

    console.log("login status:", res.status);
    console.log("login body:", res.body);
    console.log("text:", res.text);

    ctx.token = res.body.token;
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("should get all typing texts", async () => {
    const { expect, request } = await getChai();
    const res = await request
      .execute(app)
      .get("/api/v1/texts")
      .set("Authorization", `Bearer ${ctx.token}`);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("texts");
  });

  it("should create a typing text", async () => {
    const { expect, request } = await getChai();
    const res = await request
      .execute(app)
      .post("/api/v1/texts")
      .set("Authorization", `Bearer ${ctx.token}`)
      .set("content-type", "application/json")
      .send({
        content: "This is a test typing text again",
        difficulty: "easy",
      });

    // console.log("login status:", res.status);
    // console.log("login body:", res.body);
    // console.log("text:", res.text);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property("content");
    ctx.textId = res.body.content._id;
  });
});
