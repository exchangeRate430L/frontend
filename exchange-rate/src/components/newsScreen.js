import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import moment from "moment";
import axios from "axios";
import "../App.css";

const NewsScreen = () => {
  const [articles, setArticles] = useState([]);
  const [articles2, setArticles2] = useState([]);

  useEffect(() => {
    const url =
      "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=9bdf894446a348799f504060b0723c9c";

    axios.get(url).then((response) => {
      const formattedArticles = response.data.articles.map((article) => ({
        title: article.title,
        description: article.description,
        publishedAt: moment(article.publishedAt).format("MMMM DD, YYYY"),
        url: article.url,
      }));
      setArticles(formattedArticles);
    });
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9bdf894446a348799f504060b0723c9c"
      )
      .then((response) => {
        const formattedArticles2 = response.data.articles.map((article) => ({
          title: article.title,
          description: article.description,
          publishedAt: moment(article.publishedAt).format("MMMM DD, YYYY"),
          url: article.url,
        }));
        setArticles2(formattedArticles2);
      });
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="news-header">Latest News</h1>
      <div className="news-container">
        <div className="left-news-container">
          <h2 className="card-header">Wall Street Journal</h2>
          {articles.map((article) => (
            <div key={article.title} className="news-card">
              <a
                key={article.title}
                href={article.url}
                target="_blank"
                rel="noreferrer"
              >
                <h3 className="news-title">{article.title}</h3>
              </a>
              <p className="news-description">{article.description}</p>
              <p className="news-date">{article.publishedAt}</p>
            </div>
          ))}
        </div>
        <div className="right-news-container">
          <h2 className="card-header">
            Top business headlines in the US right now
          </h2>
          {articles2.map((article) => (
            <div key={article.title} className="news-card">
              <a
                key={article.title}
                href={article.url}
                target="_blank"
                rel="noreferrer"
              >
                <h3 className="news-title">{article.title}</h3>
              </a>
              <p className="news-description">{article.description}</p>
              <p className="news-date">{article.publishedAt}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewsScreen;
