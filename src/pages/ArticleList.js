import React from "react";
import articles from "./article-content";
import ArticlesList from "../components/ArticlesList";

function ArticleList() {
  return (
    <div>
      <h1 className="uniqueh1" style={{ textAlign: "center" }}>Articles</h1>
      <ArticlesList articles={articles} />
      
    </div>
  );
}

export default ArticleList;
