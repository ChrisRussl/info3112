import React, { useState, useReducer, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import {
  Toolbar,
  AppBar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Snackbar,
} from "@mui/material";

import Project1Component from "./project1/Project1Component";
import ProjectAddComponent from "./project1/ProjectAddComponent";
import ProjectListComponent from "./project1/ProjectListComponent";

import "./App.css";
import logo from "./project1/logo.png";
const App = () => {
  //for server test comment out first ,for local dev comment out second one
  const GRAPHURL = "http://localhost:5000/graphql";
  //const GRAPHURL = "/graphql";

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const initialState = {
    msg: "",
    snackBarMsg: "",
    contactServer: false,
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({
      msg: `Close`,
      contactServer: false,
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Geckos - Sprint Compass
          </Typography>
          <IconButton
            id="menubtn"
            onClick={handleClick}
            color="inherit"
            style={{ marginLeft: "auto", paddingRight: "1vh" }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={NavLink} to="/home" onClick={handleClose}>
              Home
            </MenuItem>
            <MenuItem
              component={NavLink}
              to="/addproject"
              onClick={handleClose}
            >
              Add Project
            </MenuItem>
            <MenuItem
              component={NavLink}
              to="/listproject"
              onClick={handleClose}
            >
              List Projects
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Card className="card">
        <div
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        >
          <CardMedia
            component="img"
            style={{
              marginTop: "1vh",
              width: "15%",
              height: "15%",
            }}
            image={logo}
            alt="logo"
          />
        </div>
        <CardHeader
          title="Sprint Compass"
          style={{ color: theme.palette.primary.main, textAlign: "center" }}
        />
        <CardContent>
          {/* Content Start */}

          <Routes>
            <Route path="/" element={<Project1Component />} />
            <Route path="/home" element={<Project1Component />} />
            <Route
              path="/addproject"
              element={
                <ProjectAddComponent GRAPHURL={GRAPHURL} setState={setState} />
              }
            />
            <Route
              path="/listproject"
              element={
                <ProjectListComponent GRAPHURL={GRAPHURL} setState={setState} />
              }
            />
          </Routes>
          {/* Content End */}
          <Typography
            color="primary"
            style={{ float: "right", padding: "1vh", fontSize: "smaller" }}
          >
            &copy;INFO3112 The Geckos - 2023
          </Typography>
        </CardContent>
      </Card>
      <Snackbar
        open={state.contactServer}
        message={state.snackBarMsg}
        autoHideDuration={3000}
        onClose={snackbarClose}
      />
    </ThemeProvider>
  );
};
export default App;
