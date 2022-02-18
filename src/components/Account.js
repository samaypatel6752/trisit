import React from "react";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import './Account.css'
import { db } from "./firebase";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { collection, addDoc } from "firebase/firestore";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const theme = createTheme();
const Account = () => {
  const [lemail, setlemail] = useState("");
  const [lpass, setlpass] = useState("");
  const [user, setuser] = useState(0);
  const [remail, setremail] = useState("");
  const [rpass, setrpass] = useState("");
  const [value, setValue] = React.useState(0);
  const [sclass, setsClass] = useState("Select your class");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  onAuthStateChanged(auth, (currentuser) => {
    setuser(currentuser);
  });

  const changee = (event) => {
    setlemail(event.target.value);
  };
  const chnagep = (event) => {
    setlpass(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const changee2 = (event) => {
    setremail(event.target.value);
  };
  const chnagep2 = (event) => {
    setrpass(event.target.value);
  };

  const regester = async () => {
    try {
      const hello = await createUserWithEmailAndPassword(auth, remail, rpass);
      const ref = collection(db, "users");
      const userName = remail.split("@");
      const makeUser = await addDoc(ref, {
        email: userName[0],
        class: sclass,
        role: "member",
        post: "member",
        status: ""
      });
    } catch (err) {}
    const ref = collection(db, "users");
  };
  const login = async () => {
    try {
      const hello = await signInWithEmailAndPassword(auth, lemail, lpass);
    } catch (err) {
      alert("Login failed! Please enter valid input");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        backgroundColor: "rgba(17, 40, 53,0.9)",
        minHeight: "100vh",
        overflow: "hidden",
        scrollable: false,
        minWidth: "100vw",
      }}
    >
      <>
        <Box sx={{ width: "100%" }}>
          <Box
            style={{ margin: "0 auto" }}
            sx={{ borderBottom: 1, mx: "auto", borderColor: "divider" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab sx={{ color: "white" }} label="LOGIN" {...a11yProps(0)} />
              <Tab sx={{ color: "white" }} label="SIGNUP" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ThemeProvider id="login" theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography
                    sx={{ color: "white" }}
                    component="h1"
                    variant="h5"
                  >
                    Login
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      
                      sx={{ color: "white" }}
                      style={{ color: "white" }}
                      label="Email Address"
                      name="email"
                      value={lemail}
                      onChange={changee}
                      autoComplete="email"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      value={lpass}
                      onChange={chnagep}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      onClick={login}
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Login
                    </Button>
                    <Grid container>
                      <Grid item></Grid>
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ThemeProvider id="signup" theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography
                    sx={{ color: "white" }}
                    component="h1"
                    variant="h5"
                  >
                    SignUp
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                    
                      label="Email Address"
                      name="email"
                      value={remail}
                      onChange={changee2}
                      autoComplete="email"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      value={rpass}
                      onChange={chnagep2}
                      type="password"
                      
                      autoComplete="current-password"
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Class
                      </InputLabel>
                      <Select
                        required
                        value={sclass}
                        label="Class"
                        onChange={(e) => setsClass(e.target.value)}
                      >
                        <MenuItem value={"9-A"}>9-A</MenuItem>
                        <MenuItem value={"9-B"}>9-B</MenuItem>
                        <MenuItem value={"9-C"}>9-C</MenuItem>
                        <MenuItem value={"10-A"}>10-A</MenuItem>
                        <MenuItem value={"10-B"}>10-B</MenuItem>
                        <MenuItem value={"10-C"}>10-C</MenuItem>
                        <MenuItem value={"11-COM"}>11-COM</MenuItem>
                        <MenuItem value={"11-SCI"}>11-SCI</MenuItem>
                        <MenuItem value={"12-COM"}>12-COM</MenuItem>
                        <MenuItem value={"12-SCI"}>12-SCI</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      onClick={regester}
                      sx={{ mt: 3, mb: 2 }}
                    >
                      SignUp
                    </Button>
                    <Grid container>
                      <Grid item></Grid>
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </TabPanel>
        </Box>
      </>
    </div>
  );
};

export default Account;
