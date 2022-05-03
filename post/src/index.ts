import express, { Request, Response, NextFunction } from "express";
import router from "./routes/index";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3001;
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`server runing on http://localhost:${PORT}`);
});
