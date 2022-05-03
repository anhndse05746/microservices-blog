import { randomBytes } from "crypto";
import { RequestHandler } from "express";
import { CreatePostDTO } from "./dtos/post";
import axios from "axios";

interface IPost {
  id: string;
  title: string;
}

const posts: { [id: string]: IPost } = {};

const get: RequestHandler = (req, res, next) => {
  res.send(posts);
};

const create: RequestHandler = (req, res, next) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body as CreatePostDTO;

  posts[id] = {
    id,
    title,
  };

  //send event to event-bus
  axios.post("http://localhost:3005/events", {
    type: "PostCreated",
    data: posts[id],
  });

  res.status(201).send(posts[id]);
};

export default { get, create };
