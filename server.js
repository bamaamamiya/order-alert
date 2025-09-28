require("dotenv").config();
const express = require("express");
const sendEmail = require("./api/send-email");

const app = express();
app.use(express.json());

app.post("/api/send-email", sendEmail);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
