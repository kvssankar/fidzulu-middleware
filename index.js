//initialise express
const express = require("express");
const app = express();

app.use("/classA", require("./routes/classA"));
app.use("/classB", require("./routes/classB"));

app.listen(5000, () => {
  console.log("Running on 5000...");
});
