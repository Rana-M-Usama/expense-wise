import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { Stack } from "@mui/system";
import { updateProfileApi } from "api/auth";
import { useSelector } from "react-redux";

import type { RootState } from "app/store";
import userImage from "assets/user.png";
import useStyles from "pages//profile/profile.styles";

const ProfilePage = () => {
  const classes = useStyles();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const [profileData, setProfileData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    imageUrl: currentUser.imageUrl,
  });

  const changeHandlerData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateProfileApi({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      imageUrl: profileData.imageUrl,
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      className={classes.container}
      sx={{ boxShadow: 5 }}
    >
      <Stack sx={{ alignItems: "center", p: 2 }}>
        <Avatar
          alt="Remy Sharp"
          src={userImage}
          sx={{
            width: 200,
            height: 200,
            border: "5px solid #9e9e9e70",
          }}
        />
      </Stack>
      <Button sx={{ my: 2 }} variant="contained" component="label">
        Upload image
        <input
          type="file"
          hidden
          onChange={changeHandlerData}
          name="imageUrl"
        />
      </Button>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box className={classes.box}>
              <Typography>First Name</Typography>
              <TextField
                className={classes.textfield}
                variant="outlined"
                inputProps={{ style: { padding: 7 } }}
                type="text"
                placeholder="First Name"
                name="firstName"
                value={profileData.firstName}
                onChange={changeHandlerData}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.box}>
              <Typography>Last Name</Typography>
              <TextField
                className={classes.textfield}
                variant="outlined"
                inputProps={{ style: { padding: 7 } }}
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={profileData.lastName}
                onChange={changeHandlerData}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.box}>
              <Typography>Email</Typography>
              <TextField
                disabled
                className={classes.textfield}
                variant="outlined"
                inputProps={{ style: { padding: 7 } }}
                type="email"
                placeholder="Email"
                name="email"
                value={profileData.email}
                onChange={changeHandlerData}
              />
            </Box>
          </Grid>
          <Grid container justifyContent="center">
            <Button
              type="submit"
              sx={{ my: 2 }}
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProfilePage;
