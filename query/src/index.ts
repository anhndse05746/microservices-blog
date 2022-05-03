import express from "express";
import router from "./routes";
import morgan from "morgan";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3003;
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`query service is running on http://localhost:${PORT}`);
});
