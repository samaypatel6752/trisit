import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import loadingsvg from "../img/loadingsvg.svg"
import Fade from "react-reveal/Fade";
import news from './api/news.json'
import "./News.css";
const News = () => {
  const [user, setuser] = useState(0);
  const [loading, setLoading] = useState(false);
  onAuthStateChanged(auth, (currentuser) => {
    setuser(currentuser);
  });
  const [data, setdata] = useState(news)
  
  return (
    <div>
      {user === null ? (
        <Navigate to="/account"></Navigate>
      ) : (
        <div id="body">
          <div id="nav">
            <h3>News</h3>
          </div>
          {loading ? (
            <>
              <div id="loading">
                <img src={loadingsvg}></img>
              </div>
            </>
          ) : (
            <>
              <div id="newss">
                {data.map((item, key) => (
                  
                    <div key={key} id="cards">
                      <p id="email">Admin - Samay</p>
                      <h2 id="h1">{item.title}</h2>
                      <img src={item.urlToImage}></img>
                      <p id="dec">{item.description}</p>
                    </div>
                  
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default News;
