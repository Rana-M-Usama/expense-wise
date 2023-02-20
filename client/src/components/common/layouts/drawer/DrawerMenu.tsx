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
import React, { FC } from "react";
import { Home as Dashboard } from "@mui/icons-material";
import { Link } from "react-router-dom";

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
];

const DrawerMenu: FC<Props> = ({ open, toggle }) => {
  const classes = useStyles();

  const sideList = () => (
    <Box className={classes.menuSliderContainer}>
      <Box sx={{ alignItems: "center" }}>
        <Avatar
          className={classes.avatar}
          sx={{ width: 150, height: 90, my: 5 }}
          src={logo}
          alt="wolfPack"
        />
      </Box>
      <Divider />
      <List>
        {listItems.map((listItem, index) => (
          <ListItem key={listItem.listText} disablePadding>
            <ListItemButton
              component={Link}
              to={listItem.to}
              onClick={toggle}
              key={index}
            >
              <ListItemIcon>{listItem.listIcon}</ListItemIcon>
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
