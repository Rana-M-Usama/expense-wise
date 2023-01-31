import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  BorderHorizontal,
  Home as Dashboard,
  Info,
  Payment,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import React from "react";

import logo from "assets/logo.png";
import useStyles from "./DrawerMenu.styles";

type Props = {
  open: boolean;
  toggle: () => void;
};

const listItems = [
  {
    listIcon: <Dashboard />,
    listText: "Home",
    to: "/",
  },
  {
    listIcon: <Payment />,
    listText: "Expenses",
    to: "/expenses",
  },
  {
    listIcon: <BorderHorizontal />,
    listText: "Sheets",
    to: "/sheets",
  },
  {
    listIcon: <Info />,
    listText: "About",
    to: "about",
  },
];

const DrawerMenu: React.FC<Props> = ({ open, toggle }) => {
  const classes = useStyles();

  const sideList = () => (
    <Box className={classes.menuSliderContainer}>
      <Box sx={{ alignItems: "center" }}>
        <Avatar
          className={classes.avatar}
          sx={{ width: 150, height: 150 }}
          src={logo}
          alt="wolfPack"
        />
      </Box>
      <Divider />
      <List>
        {listItems.map((listItem, index) => (
          <ListItem key={listItem.listText} disablePadding>
            <ListItemButton
              className={classes.listItem}
              component={Link}
              to={listItem.to}
              onClick={toggle}
              key={index}
            >
              <ListItemIcon className={classes.listItem}>
                {listItem.listIcon}
              </ListItemIcon>
              <ListItemText primary={listItem.listText} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer open={open} anchor="left" onClose={toggle}>
      {sideList()}
    </Drawer>
  );
};

export default DrawerMenu;
