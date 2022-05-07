import express from "express";
import router from "./routes";
import morgan from "morgan";
import cors from "cors";
import axios from "axios";
import { handleEvents } from "./controllers";

const app = express();

const PORT = process.env.PORT || 3003;
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use(router);

app.listen(PORT, async () => {
  console.log(`query service is running on http://localhost:${PORT}`);

  //Events sync
  const { data } = await axios.get("http://localhost:3005/events");

  data.map((item: { type: string; data: any }) => {
    const { type, data } = item;
    handleEvents(type, data);
  });
});
