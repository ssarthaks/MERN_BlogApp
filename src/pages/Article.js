import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentsList from "../components/CommentsList.js";
import AddCommentForm from "../components/AddCommentForm.js";
import articles from "./article-content";
import NotFound from "./NotFound";
import useUser from "../hooks/useUser.js";
import "../css/article.css"; // Import the CSS file for styling

const Article = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
    canUpvote: false,
  });
  const [isFormVisible, setFormVisible] = useState(false); // State for form visibility
  const { articleId } = useParams(); // Fetch articleId from URL
  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      try {
        const token = user && (await user.getIdToken());
        const headers = token ? { authtoken: token } : {};
        const response = await axios.get(`/api/articles/${articleId}`, {
          headers,
        });
        const newArticleInfo = response.data;
        setArticleInfo(newArticleInfo);
      } catch (error) {
        console.error("Error fetching article info:", error);
      }
    };

    if (!isLoading) {
      loadArticleInfo();
    }
  }, [user, isLoading, articleId]);

  const article = articles.find((article) => article.name === articleId);

  const addUpvote = async () => {
    try {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const response = await axios.put(
        `/api/articles/${articleId}/upvote`,
        null,
        { headers }
      );
      const updatedArticle = response.data;
      setArticleInfo(updatedArticle);
    } catch (error) {
      console.error("Error adding upvote:", error);
    }
  };

  if (!article) return <NotFound />;

  return (
    <div className="article-container">
      <h1 className="article-title">{article.title}</h1>
      <div className="article-content-layout">
        <div className="article-content">
          {article.content.map((paragraph, i) => (
            <p className="article-paragraph" key={i}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className="article-actions">
          <div className="upvote-section">
            {user ? (
              <button
                className={`upvote-button ${!articleInfo.canUpvote ? 'disabled' : ''}`}
                onClick={addUpvote}
                disabled={!articleInfo.canUpvote}
              >
                {articleInfo.canUpvote ? "Upvote" : "Already Upvoted"}
              </button>
            ) : (
              <button className="upvote-button disabled" disabled>
                Login to upvote
              </button>
            )}
            <p className="upvote-count">
              This article has {articleInfo.upvotes} upvote(s)
            </p>
          </div>
          {user ? (
            <button
              onClick={() => setFormVisible(!isFormVisible)}
              className="toggle-form-button"
            >
              {isFormVisible ? "Cancel" : "Add Comment"}
            </button>
          ) : (
            <button className="comment-button disabled" disabled>
              Login to comment
            </button>
          )}
          <div
            className={`comment-form-container ${
              isFormVisible ? "form-visible" : "form-hidden"
            }`}
          >
            <AddCommentForm
              articleId={articleId}
              onArticleUpdated={(updatedArticle) =>
                setArticleInfo(updatedArticle)
              }
            />
          </div>
        </div>
      </div>
      <CommentsList comments={articleInfo.comments} />
    </div>
  );
};

export default Article;
