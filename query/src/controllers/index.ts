import { RequestHandler } from "express";

interface Post {
  id: string;
  title: string;
  comments?: Array<Comment>;
}

interface Comment {
  id: string;
  content: string;
  status: "pending" | "approved" | "rejected";
}

const posts: { [postId: string]: Post } = {};

const eventsReceived: RequestHandler = (req, res, next) => {
  console.log(req.body);

  const { type: eventType, data } = req.body;

  if (eventType === "PostCreated") {
    const post = req.body.data as Post;

    posts[post.id] = { ...post, comments: [] };
  }

  if (eventType === "CommentCreated") {
    const { postId, ...comment } = data;

    posts[postId].comments?.push(comment);
  }

  if (eventType === "CommentUpdated") {
    const { id: commentId, postId, status } = data;

    const comments = posts[postId].comments;

    const comment = comments!.find((comment) => comment.id === commentId);

    comment!.status = status;
  }

  res.send("Okay");
};

const getPosts: RequestHandler = (req, res, next) => {
  res.send(posts);
};

export default { eventsReceived, getPosts };
