import { useEffect } from "react";
import React, { useState } from "react";

const CommentCard = ({ initialComments }) => {
  const [comments, setComments] = useState([]);

    useEffect(() => {
    setComments(initialComments || []);
    }, [initialComments]);
    const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    const trimmed = newComment.trim();
    if (!trimmed) return;

    const newId = comments.length + 1;
    setComments([
      ...comments,
      { id: newId, user: "you", text: trimmed, isTrainer: false }
    ]);
    setNewComment("");
  };

  return (
    <div className="comment-card">
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>
              {comment.user} {comment.isTrainer ? "(trainer)" : ""}:
            </strong>{" "}
            {comment.text}
          </li>
        ))}
      </ul>

      <div className="comment-input">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={handleAddComment}>Add</button>
      </div>
    </div>
  );
};

export default CommentCard;
