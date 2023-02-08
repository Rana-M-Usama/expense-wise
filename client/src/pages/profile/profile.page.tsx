import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";

import { validateFirstName, validateLastName } from "validators/auth";
import type { RootState } from "app/store";
import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";

import { styles } from "constants/styles";
import userImage from "assets/user.png";
import useStyles from "pages//profile/profile.styles";

const ProfilePage = () => {
  const classes = useStyles();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { loading, request, error, clearError } = useHttp();

  const [profileData, setProfileData] = useState({
    firstName: { value: currentUser.firstName, error: false, errorMessage: "" },
    lastName: { value: currentUser.lastName, error: false, errorMessage: "" },
    email: currentUser.email,
    imageUrl: currentUser.imageUrl,
  });

  const changeHandlerData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileData({
      ...profileData,
      [name]: {
        value: value,
        error: false,
        errorMessage: "",
      },
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let { firstName, lastName, imageUrl, email } = profileData;

    firstName = {
      ...firstName,
      ...validateFirstName(profileData.firstName.value),
    };
    lastName = {
      ...lastName,
      ...validateLastName(profileData.lastName.value),
    };

    setProfileData({
      firstName,
      lastName,
      imageUrl: imageUrl,
      email: email,
    });

    if (!(firstName.error || lastName.error)) {
      await request("/auth/me", "PUT", {
        firstName: firstName.value,
        lastName: lastName.value,
      });

      if (!error) {
        Toast("success", "Profile updated successfully.");
      }
    }
  };

  useEffect(() => {
    setProfileData({
      firstName: {
        value: profileData.firstName.value,
        error: profileData.firstName.error,
        errorMessage: profileData.firstName.errorMessage,
      },
      lastName: {
        value: profileData.lastName.value,
        error: profileData.lastName.error,
        errorMessage: profileData.lastName.errorMessage,
      },
      email: currentUser.email,
      imageUrl: currentUser.imageUrl,
    });
  }, [profileData.firstName.value, profileData.lastName.value]);

  useEffect(() => {
    if (error) {
      Toast("danger", error);
      clearError();
    }
  }, [error]);

  return (
    <Container
      component="main"
      maxWidth="md"
      className={classes.container}
      sx={{ boxShadow: 5 }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Stack sx={{ alignItems: "center", p: 2 }}>
            <Avatar
              alt="Remy Sharp"
              src={userImage}
              sx={{
                width: 200,
                height: 200,
                border: `5px solid ${styles.userAvatar.border}`,
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
                    value={profileData.firstName.value}
                    onChange={changeHandlerData}
                    error={profileData.firstName.error}
                  />
                  {profileData.firstName.error && (
                    <div className={classes.errorMessage}>
                      {profileData.firstName.errorMessage}
                    </div>
                  )}
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
                    value={profileData.lastName.value}
                    onChange={changeHandlerData}
                    error={profileData.lastName.error}
                  />
                  {profileData.lastName.error && (
                    <div className={classes.errorMessage}>
                      {profileData.lastName.errorMessage}
                    </div>
                  )}
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
        </>
      )}
    </Container>
  );
};

export default ProfilePage;
