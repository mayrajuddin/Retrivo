import "dotenv/config";
import app from "./src/app.js";
import process from "node:process";
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Retrivo server running on port ${PORT}`);
});