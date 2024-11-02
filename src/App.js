// App.js

import React, { useState, useEffect } from "react";
import "./App.css";
import MarkDown from "markdown-to-jsx";

function App() {
  const [content, setContent] = useState("");
  const [firstLines, setFirstLines] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const articles = require.context("./Articles", true);
  const articleList = articles.keys().map((article) => articles(article));

  // Fetch first lines of all articles on component mount
  useEffect(() => {
    const fetchFirstLines = async () => {
      const lines = await Promise.all(
        articleList.map(async (article) => {
          const response = await fetch(article);
          const text = await response.text();
          return text.split("\n")[0].replace("# ", ""); // Get the first line
        })
      );
      setFirstLines(lines); // Store first lines
    };

    fetchFirstLines();
  }, [articleList]);

  // Fetch full content when an article is selected
  const handleArticleClick = (index) => {
    setSelectedIndex(index);
    fetch(articleList[index])
      .then((res) => res.text())
      .then((res) => setContent(res));
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter articles based on the search term
  const filteredArticles = firstLines.filter((firstLine) =>
    firstLine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <nav className="nav-list">
        <h4>Integration Lighthouse</h4>
        <input
          type="text"
          placeholder="Search titles..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <ul>
          {filteredArticles.map((firstLine, index) => (
            <li key={index}>
              <button
                onClick={() =>
                  handleArticleClick(firstLines.indexOf(firstLine))
                }
              >
                {firstLine || "Loading..."}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="content-area">
        {content ? (
          <MarkDown>{content}</MarkDown>
        ) : (
          <div className="welcome-message">
            <p>
              Welcome to Integration Lighthouse!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
