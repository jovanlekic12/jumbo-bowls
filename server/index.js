"use strict";
import dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";
import dns from "dns";
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const app = express();
const PORT = 3000;
app.use(express.json());

dotenv.config({ path: "./config.env" });

const pass = encodeURIComponent(process.env.DATABASE_PASSWORD);
const db = process.env.DATABASE_SRV.replace("<PASSWORD>", pass);

mongoose
  .connect(db)
  .then(() => console.log("Database connection is successful"))
  .catch((error) => {
    "There was an error when connecting to the database";
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Hello World!!");
});
