const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 8080;

// Replace this with the correct name of your Angular app build folder
const DIST_FOLDER = path.join(__dirname, "dist/my-project/browser");

app.use(express.static(DIST_FOLDER));
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(middleware.route);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join("dist/my-project/browser", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
