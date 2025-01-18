import React, { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";
import "../css/addcommentform.css"

const AddCommentForm = ({ articleId, onArticleUpdated }) => {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const { user } = useUser();

  const addComment = async () => {
    try {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const response = await axios.post(
        `/api/articles/${articleId}/comments`,
        {
          postedBy: name,
          text: commentText,
        },
        { headers }
      );
      const updatedArticle = response.data;
      onArticleUpdated(updatedArticle);
      setName(""); // Clear input fields
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="add-comment-form">
      <h3>Add a Comment</h3>
      {user && <p>You are posting as {user.email}</p>}
        <textarea
          rows="4"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Enter comment here..."
        />
      <button onClick={addComment} disabled={!commentText}>
        Add Comment
      </button>
    </div>
  );
};

export default AddCommentForm;
