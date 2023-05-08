import React from "react";
import { Link } from "react-router-dom";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Button } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import "../App.css";
import { FaNewspaper, FaSignOutAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Tooltip } from "@mui/material";

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
                  <Tooltip title="News Feed">
                    <Button color="inherit" component={Link} to="/news">
                        <FaNewspaper/>
                    </Button>
                  </Tooltip>
                  <Tooltip title="Go to Home">
                    <Button color="inherit" component={Link} to="/">
                      <FaHome />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Go to profile">
                    <Button color="inherit" component={Link} to="/profile">
                      <FaEdit />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Logout">
                    <Button color="inherit" onClick={logout}>
                      <FaSignOutAlt />
                    </Button>
                  </Tooltip>
                </div>
              ) : (
                <div>
                  <Tooltip title="News Feed">
                    <Button color="inherit">
                      <Link to="/news" className="nav-link-profile">
                        News
                      </Link>
                    </Button>
                  </Tooltip>
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
              <Tooltip title="News Feed">
                <Button color="inherit">
                  <Link to="/news" className="nav-link-profile">
                    News
                  </Link>
                </Button>
              </Tooltip>
              <Tooltip title="Go to Home">
                <Button color="inherit">
                  <Link to="/" className="nav-link-profile">
                    Home
                  </Link>
                </Button>
              </Tooltip>
              <Tooltip title="Create a new account">
                <Button
                  color="inherit"
                  onClick={() => setAuthState(States.USER_CREATION)}
                >
                  Register
                </Button>
              </Tooltip>
              <Tooltip title="Login if you have an account">
                <Button
                  color="inherit"
                  onClick={() => setAuthState(States.USER_LOG_IN)}
                >
                  Login
                </Button>
              </Tooltip>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
