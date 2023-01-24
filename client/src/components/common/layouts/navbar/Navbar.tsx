import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";

import DrawerMenu from "../drawer/DrawerMenu";

const Navbar = () => {
  const [auth, setAuth] = useState(true);
  const [drawerOpen, setdrawerOpen] = useState(false);
  const [menuOpen, setmenuOpen] = useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setmenuOpen(event.currentTarget);
  };

  const handleClose = () => {
    setmenuOpen(null);
  };

  const toggleSlider = () => {
    setdrawerOpen(!drawerOpen);
  };

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
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
