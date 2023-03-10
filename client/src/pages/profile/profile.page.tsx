import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/system";

import {
  validateFirstName,
  validateImageFile,
  validateLastName,
} from "validators/auth";
import { modifyCurrentUser } from "slices/userSlice";
import type { RootState } from "app/store";
import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";

import useStyles, { SmallAvatar } from "pages//profile/profile.styles";
import { styles } from "constants/styles";

const ProfilePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [inputImageFile, setInputImageFile] = useState<File>();
  const [isDeletePhoto, setIsDeletePhoto] = useState(false);
  const { loading, request, error, clearError } = useHttp();
  const [menuOpen, setMenuOpen] = useState<null | HTMLElement>(null);

  const [profileData, setProfileData] = useState({
    firstName: { value: currentUser.firstName, error: false, errorMessage: "" },
    lastName: { value: currentUser.lastName, error: false, errorMessage: "" },
    email: currentUser.email,
    imageUrl: { value: currentUser.imageUrl, error: false, errorMessage: "" },
  });

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setMenuOpen(event.currentTarget);
  };

  const handleClose = () => {
    setMenuOpen(null);
  };

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

  const changeImageHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setInputImageFile(file);
      setProfileData({
        ...profileData,
        imageUrl: {
          value: URL.createObjectURL(file),
          error: false,
          errorMessage: "",
        },
      });
      handleClose();
    }
  };

  const deleteImage = async () => {
    setIsDeletePhoto(true);
    setInputImageFile(undefined);
    setProfileData({
      ...profileData,
      imageUrl: {
        value: "",
        error: false,
        errorMessage: "",
      },
    });
    handleClose();
  };

  const cancelImage = async () => {
    setInputImageFile(undefined);
    setProfileData({
      ...profileData,
      imageUrl: {
        value: currentUser.imageUrl,
        error: false,
        errorMessage: "",
      },
    });
    handleClose();
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

    imageUrl = {
      ...imageUrl,
      ...validateImageFile(inputImageFile),
    };

    setProfileData({ firstName, lastName, imageUrl, email });

    if (
      currentUser.firstName === firstName.value &&
      currentUser.lastName === lastName.value &&
      inputImageFile === undefined &&
      !isDeletePhoto
    ) {
      firstName.error = true;
      firstName.errorMessage = "Please update first name.";
      lastName.error = true;
      lastName.errorMessage = "Please update last name.";
    }

    if (!(firstName.error || lastName.error || imageUrl.error)) {
      const formData = new FormData();
      if (inputImageFile) {
        formData.append("files", inputImageFile);
      }

      if (isDeletePhoto) {
        formData.append("isDeletePhoto", "true");
      }

      formData.append("firstName", firstName.value);
      formData.append("lastName", lastName.value);

      const response = await request(
        "/auth/me",
        "PUT",
        formData,
        "multipart/form-data",
      );

      if (!error) {
        setIsDeletePhoto(false);
        setInputImageFile(undefined);
        dispatch(modifyCurrentUser(response.data));
        Toast("success", "Profile updated successfully.");
      }
    }
  };

  useEffect(() => {
    setProfileData({
      firstName: {
        value: currentUser.firstName,
        error: false,
        errorMessage: "",
      },
      lastName: { value: currentUser.lastName, error: false, errorMessage: "" },
      email: currentUser.email,
      imageUrl: { value: currentUser.imageUrl, error: false, errorMessage: "" },
    });
  }, [currentUser]);

  useEffect(() => {
    if (error) {
      Toast("danger", error);
      clearError();
    }
  }, [error]);

  return (
    <Box className={classes.rootContainer}>
      <Container
        component="main"
        maxWidth="md"
        className={classes.container}
        sx={{ boxShadow: 5, mt: 5 }}
      >
        <Stack sx={{ alignItems: "center", p: 2 }}>
          <Badge
            onClick={handleMenu}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <IconButton sx={{ p: 0 }}>
                <SmallAvatar />
              </IconButton>
            }
          >
            <Avatar
              alt="Profile Image"
              src={profileData.imageUrl.value}
              sx={{
                width: 150,
                height: 150,
                bgcolor: `${styles.theme.primaryColor}`,
                border: `5px solid ${styles.userAvatar.border}`,
                fontSize: 150,
              }}
            >
              <Typography sx={{ fontSize: 100 }}>
                {currentUser.firstName.substring(0, 1).toUpperCase()}
              </Typography>
            </Avatar>
          </Badge>
          <Menu
            id="menu-appbar"
            className={classes.menuItem}
            anchorEl={menuOpen}
            anchorOrigin={{
              vertical: "bottom",
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
            <MenuItem>
              <label className={classes.menuItem} htmlFor="photo-upload">
                Upload Photo
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={changeImageHandler}
                />
              </label>
            </MenuItem>
            {currentUser.imageUrl && (
              <MenuItem onClick={() => deleteImage()}>Delete Photo</MenuItem>
            )}
            {inputImageFile && (
              <MenuItem onClick={() => cancelImage()}>Cancel</MenuItem>
            )}
          </Menu>
          {profileData.imageUrl.error && (
            <div className={classes.errorMessage}>
              {profileData.imageUrl.errorMessage}
            </div>
          )}
        </Stack>
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
                  sx={{
                    backgroundColor: styles.list.backgroundColor,
                    pointerEvents: "none",
                  }}
                  variant="outlined"
                  inputProps={{ style: { padding: 7 } }}
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={profileData.email}
                />
              </Box>
            </Grid>
            <Grid container justifyContent="center">
              <Button
                type="submit"
                sx={{ my: 2, width: "160px" }}
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={25} /> : "Update Profile"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfilePage;
