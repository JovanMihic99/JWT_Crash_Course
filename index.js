const express = require("express");
const authRoutes = require("./routes/auth");
const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(5000, () => {
  console.log("Now running on port 5000!");
});
