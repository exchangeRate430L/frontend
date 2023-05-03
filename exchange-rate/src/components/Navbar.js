import React from "react";
import { Link } from "react-router-dom";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Button } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import "../App.css";
import { FaSignOutAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Tooltip } from '@mui/material';

const Navbar = ({ logout, States, setAuthState, userToken }) => {
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  return (
    <div className="header">
      <AppBar position="static">
        <Toolbar classes={{ root: "nav" }}>
          <Tooltip title="Exchange Rate Website">
          <Link to="/" className="nav-link">
            LBP Exchange Tool
          </Link>
          </Tooltip>
          

          {userToken !== null ? (
            <div>
              {isSmallScreen ? (
                <div>
                  <Tooltip title="Go to Home">
                  <Button color="inherit" component={Link} to="/">
                    <FaHome />
                  </Button>
                  </Tooltip>
                  
                  <Button color="inherit" component={Link} to="/profile">
                    <FaEdit />
                  </Button>
                  <Button color="inherit" onClick={logout}>
                    <FaSignOutAlt />
                  </Button>
                </div>
              ) : (
                <div>
                  <Tooltip title="Go to Home">
                  <Button color="inherit">
                    <Link to="/" className="nav-link-profile">
                      Home
                    </Link>
                  </Button>
                  </Tooltip>
                  <Tooltip title="Go to you Profile">
                  <Button color="inherit">
                    <Link to="/profile" className="nav-link-profile">
                      Profile
                    </Link>
                  </Button>
                  </Tooltip>
                  <Tooltip title="Logout of Your Account">
                  <Button color="inherit" onClick={logout}>
                    <Link to="/" className="nav-link-profile">
                      Logout
                    </Link>
                  </Button>
                  </Tooltip>
                  
                </div>
              )}
            </div>
          ) : (
            <div>
              <Button
                color="inherit"
                onClick={() => setAuthState(States.USER_CREATION)}
              >
                Register
              </Button>
              <Button
                color="inherit"
                onClick={() => setAuthState(States.USER_LOG_IN)}
              >
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
