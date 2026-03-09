import "dotenv/config";

import express from "express";
import textRouter from "./routes/texts.js";
import connectDB from "./db/connection.js";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import authRouter from "./routes/auth.route.js";
import authenticateUser from "./middleware/auth.middleware.js";
import typingText from "./routes/typingText.route.js";
import cors from "cors";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/v1/texts", textRouter);

// login and regiter route
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/auth", authenticateUser, typingText);
// error
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is listening to port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
