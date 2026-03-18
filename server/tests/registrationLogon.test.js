import app from "../app.js";
import { factory } from "../utils/seedDB.util.js";
import getChai from "../utils/getChai.util.js";
import User from "../models/user.model.js";
import { fakerEN_US } from "@faker-js/faker";
import mongoose from "mongoose";
import connectDB from "../db/connection.js";

describe("tests for registration and logon", function () {
  const ctx = {
    password: null,
    user: null,
    token: null,
  };

  before(async () => {
    await connectDB(process.env.MONGO_URI_TEST);
    await User.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("should register the user", async () => {
    const { expect, request } = await getChai();
    ctx.password = fakerEN_US.internet.password();
    ctx.user = factory.build("user", { password: ctx.password });

    const dataToPost = {
      username: ctx.user.username,
      email: ctx.user.email,
      password: ctx.password,
    };

    const res = await request
      .execute(app)
      .post("/api/v1/auth/register")
      .set("content-type", "application/json")
      .send(dataToPost);

    console.log("status:", res.status);
    console.log("body:", res.body);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property("token");

    const newUser = await User.findOne({ email: ctx.user.email });
    expect(newUser).to.not.be.null;
  });

  it("should login the user", async () => {
    const { expect, request } = await getChai();

    const res = await request
      .execute(app)
      .post("/api/v1/auth/login")
      .set("content-type", "application/json")
      .send({
        email: ctx.user.email,
        password: ctx.password,
      });

    console.log("status:", res.status);
    console.log("body:", res.body);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("token");
  });
});
