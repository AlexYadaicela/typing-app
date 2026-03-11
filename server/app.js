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

// login and regiter route
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/texts", authenticateUser, typingTextRoute);
app.use("/api/v1/results", authenticateUser, typingResultRoute);

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
