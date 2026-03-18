import "dotenv/config";
import TypingText from "../models/typingText.model.js";
import User from "../models/user.model.js";
import { fakerEN_US } from "@faker-js/faker";
import mongoose from "mongoose";

const testUserPassword = fakerEN_US.internet.password();

const factory = {
  build: (type, overrides = {}) => {
    if (type === "user") {
      return {
        username: fakerEN_US.person.fullName(),
        email: fakerEN_US.internet.email(),
        password: fakerEN_US.internet.password(),
        ...overrides,
      };
    }
    if (type === "typingText") {
      return {
        content: fakerEN_US.lorem.sentences(),
        difficulty: ["easy", "medium", "hard"][Math.floor(3 * Math.random())],
        ...overrides,
      };
    }
  },

  create: async (type, overrides = {}) => {
    const data = factory.build(type, overrides);
    if (type === "user") return await User.create(data);
    if (type === "typingText") return await TypingText.create(data);
  },

  createMany: async (type, count, overrides = {}) => {
    return await Promise.all(
      Array.from({ length: count }, () => factory.create(type, overrides)),
    );
  },
};

const seed_db = async () => {
  let testUser = null;
  try {
    await mongoose.connect(process.env.MONGO_URI_TEST);
    await TypingText.deleteMany({});
    await User.deleteMany({});
    testUser = await factory.create("user", { password: testUserPassword });
    await factory.createMany("typingText", 20, { createdBy: testUser._id });
  } catch (err) {
    console.log("database error");
    console.log(err.message);
    throw err;
  }
  return testUser;
};

export { testUserPassword, factory, seed_db };
