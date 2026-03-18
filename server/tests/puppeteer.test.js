import puppeteer from "puppeteer";
import { expect } from "chai";
import { seed_db, testUserPassword } from "../utils/seedDB.util.js";
import mongoose from "mongoose";
import connectDB from "../db/connection.js";
import User from "../models/user.model.js";

let page = null;
let browser = null;
let testUser = null;

describe("typing-speed-test puppeteer test", function () {
  before(async function () {
    this.timeout(60000);

    await connectDB(process.env.MONGO_URI_TEST);
    await User.deleteMany({});
    testUser = await seed_db();

    browser = await puppeteer.launch({
      headless: true,
      slowMo: 50,
    });
    page = await browser.newPage();

    page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
    page.on("pageerror", (err) => console.log("PAGE ERROR:", err.message));

    await page.goto("http://localhost:5173", {
      waitUntil: "networkidle0",
      timeout: 30000,
    });
  });

  after(async function () {
    this.timeout(10000);
    await browser.close();
    await mongoose.connection.close();
  });

  describe("got to site", function () {
    it("should have completed a connection", async function () {
      await page.waitForSelector("nav");
    });
  });

  describe("index page test", function () {
    this.timeout(30000);

    it("finds the index page login link", async () => {
      await page.waitForSelector("a[href='/login']");
    });

    it("gets to the login page", async () => {
      await page.goto("http://localhost:5173/login", {
        waitUntil: "networkidle0",
        timeout: 30000,
      });
      await page.waitForSelector('input[name="email"');
    });
  });

  describe("logon page test", function () {
    this.timeout(60000);

    it("resolves all the fields", async () => {
      await page.waitForSelector('input[name="email"]');
      await page.waitForSelector('input[name="password"]');
      await page.waitForSelector('button[type="submit"]');
    });

    it("sends the logon", async () => {
      await page.type('input[name="email"]', testUser.email);
      await page.type('input[name="password"]', testUserPassword);
      await page.click('button[type="submit"]');
      await page.waitForNavigation();

      const url = page.url();
      console.log("redirected to:", url);
      expect(url).to.include("/dashboard");
    });
  });
});
