import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Navigate } from "react-router-dom";
import { db } from "./firebase";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import loadingsvg from '../img/loadingsvg.svg'
import CloseIcon from "@mui/icons-material/Close";

import {
  collection,
  getDocs,
  doc,
  setDoc,
  
  deleteDoc,
} from "firebase/firestore";
import Fade from "react-reveal/Fade";
import "./Communication.css";
import TextField from "@mui/material/TextField";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Communication = () => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const [dec, setdec] = useState("");
  const [img, setImg] = useState("");
  const [reload, setReload] = useState(0);
  const [data, setdata] = useState([]);
  const [oS, setOs] = useState(false);
  const [search, setsearch] = useState("");
  const [admin, setAdmin] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading , setLoading] = useState(true)
  const dopen = Boolean(anchorEl);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const dhandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const dhandleClose = () => {
    setAnchorEl(null);
  };
  const remnoveMsg = async (id) =>{
    const msgRef = doc(db,"admin-messages",id);
   await deleteDoc(msgRef);
    setAnchorEl(null);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const ref = collection(db, "admin-messages");
  useEffect(() => {
    setInterval(() => {
      const fetch = async () => {
        const raw = await getDocs(ref);
        const newData = raw.docs.map((data) => data.data());
        setdata(newData);
        setLoading(false)
      };
      fetch();
    }, 3000);
  }, [reload]);
  const aref = collection(db, "admins");
  useEffect(() => {
    const fetch = async () => {
      const raw = await getDocs(aref);
      const newData = raw.docs.map((data) => data.data().email);
      setAdmin(newData);
    };
    fetch();
  }, []);

  const [user, setuser] = useState(0);
  onAuthStateChanged(auth, (currentuser) => {
    setuser(currentuser);
  });

  const serach = () => {
    if (oS == false) {
      setOs(true);
    } else {
      setOs(false);
    }
  };
  
  const postMsg = async () => {
    setReload(reload + 1);
    const date = new Date();
    
    const day = date.getDate();
    var nDay = day;
    if (day>=10){
       nDay = day;
    }else{
      
    }
    const month = date.getMonth() + 1;
    var nMonth = '0'+month;
    if (month>=10){
       nMonth = month;
    }else{
      
    }
    const year = date.getFullYear();
    const fDate =  nDay + "." +  nMonth +"." + year;
    const newRef = doc(
      db,
      "admin-messages",
      `message${data.length + 1111111111111111} by ${user.email}`
    );
    // 280 trillion messages can be done
    const postDoc = await setDoc(newRef, {
      title: title==""?dec:title,
      date: fDate,
      description: title==""?"":dec,
      email: user.email,
      image: img,
      
      id:`message${data.length + 1111111111111111} by ${user.email}`
    });
    setOpen(false);
    setReload(reload + 1);
    setReload(reload + 1);
    setTitle("");
    setImg("");
    setdec("");
  };
  return (
    <div id="body">
      {user === null ? (
        <Navigate to="/account" />
      ) : (
        <>
          <div id="nav">
            <h3>General</h3>
          </div>
          <div id="rr">
            {
              loading ? (<>
              <div id="loading">
              <img src={loadingsvg}/>
              </div>
              </>):(<>
              <div id="message">
              {data
                .filter((item) => {
                  return item.title
                    .toLowerCase()
                    .includes(search.toLowerCase());
                })
                .map((item, key) => {
                  
                  const stamp = item.email == user.email ? "right" : "left";
                  
                  return (
                    
                      <div className={`card ${stamp}`} key={key}>
                        <span id={stamp}></span>
                        <p id="email">- {item.email}</p>
                        {item.title == "" ? null : (
                          <>
                            <h1>{item.title}</h1>
                            <br></br>
                          </>
                        )}
                        {item.date == "" ? null : (
                          <p id="date">Posted on: {item.date}</p>
                        )}
                        {item.image == "" ? null : <img src={item.image}></img>}
                        {item.title == "" ? null : (
                          <p id="dec">{item.description}</p>
                        )}
                        {item.email == user.email ? (
                          <div id="delete">
                            <Button

                              id="delete"
                              aria-controls={
                                open ? "demo-positioned-menu" : undefined
                              }
                              aria-haspopup="true"
                              aria-expanded={dopen ? "true" : undefined}
                              onClick={dhandleClick}
                            >
                              <span class="special material-icons">
                                more_vert
                              </span>
                            </Button>
                            <Menu
                              id="demo-positioned-menu"
                              aria-labelledby="demo-positioned-button"
                              anchorEl={anchorEl}
                              open={dopen}
                              onClose={dhandleClose}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                            >
                              <MenuItem onClick={()=>{remnoveMsg(item.id)}}>Delete</MenuItem>
                             
                            </Menu>
                          </div>
                        ) : null}
                      </div>
                    
                  );
                })}
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </div>
              </>)
            }
          </div>
          <button
            class="add"
            onClick={serach}
          >
            <span class="material-icons">search</span>
          </button>
          {oS == true ? (
            <div id="search">
              <TextField
                id="standard-basic"
                onChange={(e) => setsearch(e.target.value)}
                value={search}
                autoFocus
                autoSave="off"
                autoComplete="off"
                variant="standard"
                label="Search"
                
              />
            </div>
          ) : null}
          {user.email == admin.filter((i) => i == user.email) ? (
            <div>
              <button id="add" variant="contained" onClick={handleClickOpen}>
                <span class="material-icons">add</span>
              </button>

              <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
              >
                <AppBar id="appBar" sx={{ position: "relative" }}>
                  <Toolbar>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                    <Typography
                      sx={{ ml: 2, flex: 1 }}
                      variant="h6"
                      component="div"
                    >
                      Post Message
                    </Typography>
                    <Button
                      style={{ border: "1px solid #fff" }}
                      autoFocus
                      color="inherit"
                      onClick={postMsg}
                    >
                      Post &nbsp;<i class="material-icons">send</i>
                    </Button>
                  </Toolbar>
                </AppBar>
                <List id="post">
                  <TextField

                    label="Title"
                    variant="filled"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <br />

                  <TextField
                    id="outlined-multiline-static"
                    label="Multiline"
                    multiline
                    variant="filled"
                    rows={8}
                    value={dec}
                    onChange={(e) => setdec(e.target.value)}
                  />
                  <br />
                  <TextField
                    id="outlined-basic"
                    label="Image (url)"
                    variant="filled"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                  />
                </List>
              </Dialog>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Communication;
