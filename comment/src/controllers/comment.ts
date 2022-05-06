import { RequestHandler } from "express";
import { randomBytes } from "crypto";
import { CreateCommentDTO } from "./dtos/comments";
import axios from "axios";

export type CommentStatus = "pending" | "approved" | "rejected";
interface IComment {
  id: string;
  content: string;
  status: CommentStatus;
}

export const commentByPostId: { [postId: string]: Array<IComment> } = {};

const get: RequestHandler<{ id: string }> = (req, res, next) => {
  res.send(commentByPostId[req.params.id] || []);
};

const create: RequestHandler<{ id: string }> = (req, res, next) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body as CreateCommentDTO;

  const comments = commentByPostId[req.params.id] || [];

  comments.push({ id: commentId, content, status: "pending" });

  commentByPostId[req.params.id] = comments;

  //send event to event-bus
  axios.post("http://localhost:3005/events", {
    type: "CommentCreated",
    data: { id: commentId, content, postId: req.params.id, status: "pending" },
  });

  res.status(201).send(comments);
};

export default { get, create };
