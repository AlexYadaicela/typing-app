import "dotenv/config";

import express from "express";
import connectDB from "./db/connection.js";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import authRouter from "./routes/auth.route.js";
import authenticateUser from "./middleware/auth.middleware.js";
import typingTextRoute from "./routes/typingText.route.js";
import typingResultRoute from "./routes/typingResult.route.js";
import cors from "cors";

const app = express();

// middleware
app.set("trust proxy", 1);
app.use(express.json());
app.use(cors());

//set content-type header
// app.use((req, res, next) => {
//   if (req.path == "/multiply") {
//     res.set("Content-Type", "application/json");
//   } else {
//     res.set("Content-Type", "text/html");
//   }
//   next();
// });

// login and regiter route
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/texts", authenticateUser, typingTextRoute);
app.use("/api/v1/results", authenticateUser, typingResultRoute);

// function testing for an API
app.get("/multiply", (req, res) => {
  try {
    let result = parseFloat(req.query.first) * parseFloat(req.query.second);
    console.log(result);
    if (isNaN(result)) {
      result = "NaN";
    } else if (result === null) {
      result = "null";
    }
    res.json({ result });
  } catch (err) {
    console.error(err);
  }
});

app.get("/", (req, res) => {
  res.send("<p>Click this link</p>");
});

// error
app.use(notFound);
app.use(errorHandler);

let mongoURL = process.env.MONGO_URI;
if (process.env.NODE_ENV === "test") {
  mongoURL = process.env.MONGO_URI_TEST;
}

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(mongoURL);
    app.listen(PORT, console.log(`Server is listening to port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();

export default app;
