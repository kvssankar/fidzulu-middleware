const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/classA", require("./routes/classA"));

app.listen(3021, () => {
  console.log("Running on 3021...");
});
