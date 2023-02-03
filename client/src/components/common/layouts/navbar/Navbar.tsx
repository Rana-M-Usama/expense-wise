import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { MouseEvent, useEffect, useState } from "react";
import DrawerMenu from "components/common/layouts/drawer/DrawerMenu";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setCurrentUserEmpty } from "slices/userSlice";
import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";

const Navbar = () => {
  const [auth] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request, error, clearError } = useHttp();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setMenuOpen(event.currentTarget);
  };

  const handleClose = () => {
    setMenuOpen(null);
  };

  const toggleSlider = () => {
    setDrawerOpen(!drawerOpen);
  };

  const logout = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    await request("/auth/logout", "GET");

    if (!error) {
      dispatch(setCurrentUserEmpty());
      Toast("success", "Successfully logged out.");
      localStorage.setItem("token", "");
      navigate("/");
    }
  };

  useEffect(() => {
    if (error) {
      Toast("danger", error);
      clearError();
    }
  }, [error]);

  return (
    <AppBar>
      <Toolbar>
        <IconButton
          onClick={toggleSlider}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <DrawerMenu open={drawerOpen} toggle={toggleSlider} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ExpenseWise
        </Typography>
        {auth && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={menuOpen}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(menuOpen)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
