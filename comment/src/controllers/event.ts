import { RequestHandler } from "express";

const received: RequestHandler = (req, res, next) => {
  console.log(req.body);
  res.send(req.body.type);
};

export default { received };
