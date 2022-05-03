import { RequestHandler } from "express";

interface Post {
  id: string;
  title: string;
  comments?: Array<Comment>;
}

interface Comment {
  id: string;
  content: string;
}

const posts: { [postId: string]: Post } = {};

const eventsReceived: RequestHandler = (req, res, next) => {
  console.log(req.body);

  const eventType: string = req.body.type;

  if (eventType === "PostCreated") {
    const post = req.body.data as Post;

    posts[post.id] = { ...post, comments: [] };
  }

  if (eventType === "CommentCreated") {
    const { postId, ...comment } = req.body.data;
    console.log(comment);
    posts[postId].comments?.push(comment);
  }

  console.log(posts);

  res.send("Okay");
};

const getPosts: RequestHandler = (req, res, next) => {
  res.send(posts);
};

export default { eventsReceived, getPosts };
