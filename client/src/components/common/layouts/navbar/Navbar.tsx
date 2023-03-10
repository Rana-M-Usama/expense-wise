import {
  AppBar,
  Avatar,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { MouseEvent, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DrawerMenu from "components/common/layouts/drawer/DrawerMenu";
import { googleLogout } from "@react-oauth/google";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Stack } from "@mui/system";

import type { RootState } from "app/store";
import { setCurrentUserEmpty } from "slices/userSlice";
import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";

import { styles } from "constants/styles";

const Navbar = () => {
  const [auth] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request, error, clearError } = useHttp();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<null | HTMLElement>(null);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

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
    googleLogout();

    if (!error) {
      dispatch(setCurrentUserEmpty());
      Toast("success", "Successfully logged out.");
      localStorage.setItem("token", "");
      navigate("/login");
    }
  };

  const profile = async () => {
    navigate("/profile");
    setMenuOpen(null);
  };

  const changePassword = async () => {
    navigate("/update-password");
    setMenuOpen(null);
  };

  useEffect(() => {
    if (error) {
      Toast("danger", error);
      clearError();
    }
  }, [error]);

  return (
    <AppBar>
      <Toolbar sx={{ height: "64px" }}>
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
        <Typography component="div" sx={{ flexGrow: 1 }}>
          <Link
            component={RouterLink}
            to="/"
            variant="h6"
            color="inherit"
            underline="none"
          >
            ExpenseWise
          </Link>
        </Typography>
        {auth && (
          <div>
            <Stack
              onClick={handleMenu}
              sx={{ boxSizing: "initial", alignItems: "center" }}
            >
              <Avatar
                alt="Remy Sharp"
                src={currentUser.imageUrl}
                sx={{
                  fontSize: 35,
                  cursor: "pointer",
                  bgcolor: "white",
                  color: `${styles.theme.primaryColor}`,
                  border: `2px solid ${styles.userAvatar.border}`,
                }}
              >
                <Typography sx={{ fontSize: 25 }}>
                  {currentUser.firstName.substring(0, 1).toUpperCase()}
                </Typography>
              </Avatar>
            </Stack>
            <Menu
              sx={{ mt: 6 }}
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
              <MenuItem sx={{ pr: "2rem" }} onClick={profile}>
                Profile
              </MenuItem>
              <MenuItem sx={{ pr: "2rem" }} onClick={changePassword}>
                Change Password
              </MenuItem>
              <MenuItem sx={{ pr: "2rem" }} onClick={logout}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
