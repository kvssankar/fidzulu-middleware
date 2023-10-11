const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/classA", require("./routes/classA"));

app.listen(3021, () => {
  console.log("Running on 3021...");
});
