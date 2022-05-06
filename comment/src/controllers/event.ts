import axios from "axios";
import { RequestHandler } from "express";

import { commentByPostId, CommentStatus } from "./comment";

const received: RequestHandler = async (req, res, next) => {
  console.log(req.body);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { id, postId, status, content } = data;

    const comments = commentByPostId[postId];

    const comment = comments.find((comment) => comment.id === id);

    comment!.status = status as CommentStatus;

    await axios.post("http://localhost:3005/events", {
      type: "CommentUpdated",
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }
  res.send(req.body.type);
};

export default { received };
