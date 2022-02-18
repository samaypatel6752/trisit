import React , {useEffect, useState} from 'react';
import Account from './Account';
import { signOut,onAuthStateChanged } from 'firebase/auth';
import { auth , } from './firebase';
import Button from '@mui/material/Button';  

const User = () => {
    const [user, setuser] = useState(0)
    const [loading, setLoading] = useState(true);

    const signoutUser = () => {
        signOut(auth);
    }
   
    onAuthStateChanged(auth,(currentuser)=>{
        setuser(currentuser)
    })
 
  return <div style={{position:"fixed",top:"0",left:"0",backgroundColor:"rgba(17, 40, 53, 0.9)",minHeight:"100vh",overflow:"hidden",scrollable:false , minWidth:"100vw",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      {
          user===null?<Account></Account>:(<><h1 style={{color:"white",textAlign:"center"}}>Hello , <p style={{fontSize:"small"}}>{user.email}</p></h1>
          
          <Button onClick={signoutUser} variant="contained">Sign Out</Button>
          </>)
        
      }
      
  </div>;
};

export default User;
