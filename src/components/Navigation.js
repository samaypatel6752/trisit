import { useEffect } from "react";
import * as React from "react"
import { Link } from "react-router-dom";
import "./Navigatiom.css";

export default function Navigation() {
  const [value, setValue] = React.useState(0);
  useEffect(()=>{

    setValue(null)
  },[])
  
  const navLinks = document.querySelectorAll(".nav-link");
  const slide = document.querySelector(".slide");

  navLinks.forEach((link) => link.addEventListener("click", handleClick));

  function handleClick() {
    const index = parseInt(this.dataset.index);
    slide.style.transform = `translateX(${index * 100}%)`;
    navLinks.forEach((link) => link.classNameList.remove("active"));
    this.classNameList.add("active");
  }
  
  return (
    <>
      <div className="container">
        <div className="phone-bottom">
          <nav className="nav">
            <div className="slide">{value}</div>
            <a onClick={handleClick} className="nav-link" data-index="0">
              <Link to="/">
                <i className="material-icons">home</i>
              </Link>
            </a>
            <a onClick={handleClick} className="nav-link" data-index="1">
              <Link to="/news">
                <i className="material-icons">newspaper</i>
              </Link>
            </a>
            <a onClick={handleClick} className="nav-link" data-index="2">
              <Link  to="/team">
                <i className="material-icons">groups</i>
              </Link>
            </a>
            <a onClick={handleClick} className="nav-link" data-index="3">
              <Link  to="/account">
                <i className="material-icons">account_circle</i>
              </Link>
            </a>
           
          </nav>
        </div>
      </div>
      
    </>
  );
}
