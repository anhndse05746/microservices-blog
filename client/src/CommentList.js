import React from "react";

const CommentList = ({ postId, data }) => {
  const renderedComments = data.map((comment) => {
    const { status, content } = comment;
    let showContent = content;
    console.log(status);
    if (status === "rejected") {
      showContent = "This comment was rejected";
    }

    return <li key={comment.id}>{showContent}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
