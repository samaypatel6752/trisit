import { collection, doc, getDocs } from "firebase/firestore";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import './Team.css';
import loadingsvg from '../img/loadingsvg.svg'
import Table from '@mui/material/Table';
import  TableBody from "@mui/material/TableBody";
const Team = () => {
  const [data, setData] = useState([]);
  const [user, setuser] = useState(0);
  const [loading, setLoading] = useState(true);
  onAuthStateChanged(auth, (currentuser) => {
    setuser(currentuser);
  });
  useEffect(() => {
    const fetch = async () => {
      const ref = collection(db, "users");
      const raw = await getDocs(ref);
      const parse = raw.docs.map((doc) => doc.data());
      setData(parse);
      setLoading(false);
    };
    fetch();
  }, []);
  return (
    <div>
      
        {
          user === null?<Navigate to="/account"/>:(<>
            <div id="nav">
        <h3>Our Team</h3>
      </div>
      {
        loading?(<>
        <div id="loading">
        <img src={loadingsvg}></img>
        </div>
        </>):(<>
          <div id="table">
          <Table>
          <ListItem id="user">
              
                <ListItemButton id="row">
                 
                  <ListItemText id="semail" sx={{color:"white"}}>Name</ListItemText>
                  <ListItemText id="semail" sx={{color:"white"}}>Role</ListItemText>
                  <ListItemText id="semail" sx={{color:"white"}}>Class</ListItemText>
                </ListItemButton>
              </ListItem>
       {
           data.filter((item)=>item.role.includes("admin")&&item.status.includes("verified")).map(item =>{
               return (
                <ListItem id="user">
                <ListItemButton id="row">
                  <Avatar
                  id="logo"
                    sx={{ bgcolor: 'orange' }}
                    alt="Remy Sharp"
                    src="/broken-image.jpg"
                  >
                    A
                  </Avatar>
                  <span id="verify">Verified by Admin <span id="tick" class="material-icons">done</span></span>
                  <ListItemText id="userName" sx={{color:"white"}}>{item.email}</ListItemText>
                  <ListItemText id="email" sx={{color:"white"}}>{item.post}</ListItemText>
                  <ListItemText id="email" sx={{color:"white"}}>{item.class}</ListItemText>

                </ListItemButton>
              </ListItem>
               )
           })
           
       }
       {
           data.filter((item)=>item.role=="member"&&item.status.includes("verified")).map((item)=>{
            return (
            
             <ListItem  id="user">
             <ListItemButton id="row">
               <Avatar
                id="logo"
                 sx={{ bgcolor: 'rgb(89, 89, 255)' }}
                 alt="Remy Sharp"
                 src="/broken-image.jpg"
               >
                 M
               </Avatar>
               <span id="verify">Verified by Admin <span id="tick" class="material-icons">done</span></span>
               <ListItemText id="userName" sx={{color:"white"}}>{item.email}</ListItemText>
                  <ListItemText id="email" sx={{color:"white"}}>Member</ListItemText>
                  <ListItemText id="email" sx={{color:"white"}}>{item.class}</ListItemText>
             </ListItemButton>
           </ListItem>
        
            )
        })
       }
       </Table>
      </div>
        </>)
      }
          </>)
        }
      </div>
    
  );
};
export default Team;
