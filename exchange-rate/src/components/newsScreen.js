import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import moment from "moment";
import axios from "axios";
import "../App.css";
import { clearUserLbpBalance, clearUserRole, clearUserToken, clearUserUsdBalance, getUserToken, saveUserRole, saveUserToken } from "../localStorage";
import UserCredentialsDialog from "../UserCredentialsDialog/UserCredentialsDialog";
import UserCredentialsDialogRegister from "../UserCredentialsDialog/UserCredentialsDialogRegister";
import emailjs from "emailjs-com";

var SERVER_URL = "http://127.0.0.1:5000";
var boolAlert = 0;

const NewsScreen = () => {
  const States = {
    PENDING: "PENDING",
    USER_CREATION: "USER_CREATION",
    USER_LOG_IN: "USER_LOG_IN",
    USER_AUTHENTICATED: "USER_AUTHENTICATED",
  };
  
  const [articles, setArticles] = useState([]);
  const [articles2, setArticles2] = useState([]);
  let [authState, setAuthState] = useState(States.PENDING);

  

  function logout() {
    clearUserToken();
    clearUserRole();
    clearUserLbpBalance();
    clearUserUsdBalance();
  }

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

  function login(username, password) {
    return fetch(`${SERVER_URL}/authentication`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        setAuthState(States.USER_AUTHENTICATED);
        saveUserToken(body.token);
        saveUserRole(body.role);
      });
  }

  function createUser(username, email, password, role, lbpBalance, usdBalance, alert) {
    if(alert==='alert'){
      boolAlert = 1;
    }else{
      boolAlert = 0;
    }
    return fetch(`${SERVER_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: username,
        password: password,
        role: role,
        usd_balance: usdBalance,
        lbp_balance: lbpBalance,
        email: email,
        alert: boolAlert
      }),
    }).then((response) => {
      login(username, password);
      sendEmail(email, "Thanks for signing up!");
      console.log(response.json());
    });
  }

  function sendEmail(to_email, message) {
    const templateParams = {
      to_email,
      message,
    };

    emailjs
      .send(
        "service_w12t0fb",
        "template_0jlr076",
        templateParams,
        "ej7YxNe85ZhDS9bax"
      )
      .then((response) => {
        console.log("Email sent!", response.status, response.text);
      })
      .catch((err) => {
        console.error("Failed to send email", err);
      });
  }

  return (
    <>
      <Navbar
      logout={logout}
      States={States}
      setAuthState={setAuthState}
      userToken={getUserToken()}
      />
      <UserCredentialsDialogRegister
        open={authState === States.USER_CREATION}
        onClose={() => setAuthState(States.PENDING)}
        onSubmit={createUser}
        submitText="Sign-Up"
        title="Register"
      />

      <UserCredentialsDialog
        open={authState === States.USER_LOG_IN}
        onClose={() => setAuthState(States.PENDING)}
        onSubmit={login}
        submitText="Log in"
        title="Welcome!"
      />
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
