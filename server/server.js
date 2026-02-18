import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import app from "./app.js";
import dns from "dns";

dns.setServers(["1.1.1.1", "1.0.0.1"]);

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 🔥  Shutting down...");
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

const pass = process.env.DATABASE_PASSWORD;
const db = process.env.DATABASE_SRV.replace("<PASSWORD>", pass);

if (!db)
  throw new Error(
    "There has been an error while connecting your password to the database. Could not connect",
  );

mongoose.set("debug", true);

mongoose
  .connect(db)
  .then(() => console.log("Database connection is successful"))
  .catch((error) => {
    "There was an error when connecting to the database";
    console.log(error);
    process.exit(1);
  });

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 🔥  Shutting down...");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
