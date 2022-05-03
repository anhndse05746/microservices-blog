import cors from "cors";
import express from "express";
import morgan from "morgan";
import router from "./routes/index";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`comment service is running on http://localhost:${PORT} `);
});
