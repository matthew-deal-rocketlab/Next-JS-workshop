import express from "express";

import addRoutes from "./routes/routes";

const app = express();
const port = process.env.PORT || 80;

addRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
