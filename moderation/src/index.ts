import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.json());
app.use(morgan("tiny"));

app.post("/events", async (req: Request, res: Response, next: NextFunction) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const { content, postId, id, status } = data;

    let newStatus: "rejected" | "approved";
    if (content.includes("trang")) {
      newStatus = "rejected";
    } else {
      newStatus = "approved";
    }

    await axios.post("http://localhost:3005/events", {
      type: "CommentModerated",
      data: {
        id,
        content,
        postId,
        status: newStatus,
      },
    });
  }

  res.send({});
});

app.listen(PORT, () => {
  console.log("Moderation service is running on http://localhost:3004");
});
