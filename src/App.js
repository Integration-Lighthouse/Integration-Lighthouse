// App.js

import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./logo.jpg";
import MarkDown from "markdown-to-jsx";

import Popup from "./components/popup";

function App() {
  const [content, setContent] = useState("");
  const [firstLines, setFirstLines] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [popUp, setPopUp] = useState(false);

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
          <div class= "serach-icon">
            <button class= "serach-button" onClick={() => setPopUp(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
            </button>
          </div>
        </div>
        <div class="app-header-spacer">
        </div>
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
                Publish article
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

      <Popup trigger={popUp} setTrigger ={setPopUp} >
        <div class="app-body-navigation-popup">
          <nav class="navigation-popup">
            <div class="form-group-popup field-popup">
              <input
                type="input"
                class="form-field-popup"
                placeholder="Search titles"
                value={searchTerm}
                onChange={handleSearchChange}
                name="search-popup"
                id="search-popup"
              />
              <label for="search-popup" class="form-label-popup">
                Search titles...
              </label>
            </div>
            <div class="list-popup">
              <ul className="article-list-popup">
                {filteredArticles.map((firstLine, index) => (
                  <li className="article-list-item-popup">
                    <button
                      className="article-list-button-popup"
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
      </Popup>
    </div>
  );
}

export default App;
