const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "dist", "home-energy")));
app.use((req, res) => res.sendFile(path.join(__dirname, "dist", "home-energy", "index.html")));

const port = process.env.PORT || 4200;

app.listen(port, () => {
  console.log("App started on port " + port);
});
