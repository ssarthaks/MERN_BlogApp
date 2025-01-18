import React from "react";
import { Link } from "react-router-dom";
import "../css/articlelist.css";

const ArticlesList = ({ articles }) => {
  return (
    <div className="articleListWidth">
      {articles.map((eachArticle) => (
        <Link
          key={eachArticle.name}
          className="article-list-item"
          to={`/articles/${eachArticle.name}`}
        >
          <h3>{eachArticle.title}</h3>
          {/* Condition that only first 150 char is shown from the content */}
          <p>{eachArticle.content[0].substring(0, 150)}...</p>
          <hr />
        </Link>
      ))}
    </div>
  );
};

export default ArticlesList;
