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

  const { type, data } = req.body;

  res.send("Okay");
};

export const handleEvents = (eventType: string, data: any) => {
  if (eventType === "PostCreated") {
    const post = data as Post;

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
};

const getPosts: RequestHandler = (req, res, next) => {
  res.send(posts);
};

export default { eventsReceived, getPosts };
