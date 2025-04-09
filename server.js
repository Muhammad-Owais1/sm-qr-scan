import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// To handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Update the path to 'browser' folder inside 'dist/my-project'
const DIST_FOLDER = path.join(__dirname, "dist/my-project/browser/");

app.use(express.static(DIST_FOLDER));

// app._router.stack.forEach((middleware) => {
//   if (middleware.route) {
//     console.log(middleware.route);
//   }
// });

app.get("*", (req, res) => {
  // Serve index.html from the 'browser' folder
  res.sendFile(path.join(DIST_FOLDER, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
