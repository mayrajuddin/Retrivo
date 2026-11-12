import "dotenv/config";
import process from "node:process";

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Retrivo server running on port ${PORT}`);
  });
};

startServer();