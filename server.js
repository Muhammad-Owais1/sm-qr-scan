import express from "express";
import path from "path";
const app = express();

const PORT = process.env.PORT || 8080;

// Replace this with the correct name of your Angular app build folder
const DIST_FOLDER = path.join(__dirname, "dist/my-project");

app.use(express.static(DIST_FOLDER));

app.get("*", (req, res) => {
  res.sendFile(path.join(DIST_FOLDER, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
