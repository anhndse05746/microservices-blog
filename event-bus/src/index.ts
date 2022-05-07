import axios from "axios";
import express, { Request, Response, NextFunction } from "express";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

interface Event {
  type: string;
  data: object;
}

const events: Array<Event> = [];

app.post("/events", (req: Request, res: Response, next: NextFunction) => {
  const event = req.body as Event;

  events.push(event);

  //Post
  axios.post("http://localhost:3001/events", event).catch((err: Error) => {
    console.log(err);
  });

  //Comment
  axios.post("http://localhost:3002/events", event).catch((err: Error) => {
    console.log(err);
  });

  //Query
  axios.post("http://localhost:3003/events", event).catch((err: Error) => {
    console.log(err);
  });

  //Moderation
  axios.post("http://localhost:3004/events", event).catch((err: Error) => {
    console.log(err);
  });

  res.send("OK");
});

app.get("/events", (req: Request, res: Response, next: NextFunction) => {
  res.send(events);
});

app.listen(PORT, () => {
  console.log(`event bus is runing on http://localhost:${PORT}`);
});
