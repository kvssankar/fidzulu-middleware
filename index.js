const express = require("express");
const app = express();

app.use("/classA", require("./routes/classA"));

app.listen(3021, () => {
  console.log("Running on 5000...");
});
