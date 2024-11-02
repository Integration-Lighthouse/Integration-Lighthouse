// App.js

import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./logo.jpg";
import MarkDown from "markdown-to-jsx";

function App() {
  const [content, setContent] = useState("");
  const [firstLines, setFirstLines] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const articles = require.context("./Articles", true);
  const articleList = articles.keys().map((article) => articles(article));

  console.log(selectedIndex);

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
    <div class="app">
      <header class="app-header">
        <div class="app-header-logo">
          <div class="logo">
            <span class="logo-icon">
              <img src={logo} alt="logo" />
            </span>
            <h1 class="logo-title">
              <span>Integration</span>
              <span>Lighthouse</span>
            </h1>
          </div>
        </div>
        <div class="app-header-spacer"></div>
        <div class="app-header-actions">
          <div class="app-header-spacer"></div>
          <div>
            <button class="user-profile">
              <a
                class="user-profile"
                href="https://github.com/Integration-Lighthouse/Integration-Lighthouse/blob/main/README.md"
                target="_blank"
                rel="noreferrer"
              >
                Collaborate
              </a>
            </button>
          </div>
        </div>
      </header>
      <div class="app-body">
        <div class="app-body-navigation">
          <nav class="navigation">
            <div class="form-group field">
              <input
                type="input"
                class="form-field"
                placeholder="Search titles"
                value={searchTerm}
                onChange={handleSearchChange}
                name="search"
                id="search"
              />
              <label for="search" class="form-label">
                Search titles...
              </label>
            </div>
            <div class="list">
              <ul className="article-list">
                {filteredArticles.map((firstLine, index) => (
                  <li className="article-list-item">
                    <button
                      className="article-list-button"
                      onClick={() =>
                        handleArticleClick(firstLines.indexOf(firstLine))
                      }
                    >
                      {firstLine || "Loading..."}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
        <div class="app-body-main-content">
          <div className="content-area">
            {content ? (
              <MarkDown>{content}</MarkDown>
            ) : (
              <div className="welcome-message">
                <h2>Welcome to Integration Lighthouse!</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
