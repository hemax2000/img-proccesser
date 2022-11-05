import express, { Application } from "express";
import routes from "./routes/index";

const PORT = 3000;
// create an instance server
const app: Application = express();
// HTTP request logger middleware

app.use("/api", routes);

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at localhost:${PORT}`);
});
export default app;
