import axios from "axios";
import express, { Request, Response, NextFunction } from "express";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

interface Event {
  name: string;
  type: string;
  data: object;
}

app.post("/events", (req: Request, res: Response, next: NextFunction) => {
  const event = req.body as Event;

  //Post
  axios.post("http://localhost:3001/events", event);

  //Comment
  axios.post("http://localhost:3002/events", event);

  //Query
  axios.post("http://localhost:3003/events", event);

  //Moderation
  axios.post("http://localhost:3004/events", event);

  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`event bus is runing on http://localhost:${PORT}`);
});
