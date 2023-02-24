import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";

import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";

import useStyles from "pages/resetpassword/resetpassword.styles";

const ConfirmEmailPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { confirmEmailToken } = useParams<{
    confirmEmailToken: string | undefined;
  }>();
  const { request, error, clearError } = useHttp();

  const confirmEmail = async () => {
    await request(`/auth/confirm-email/${confirmEmailToken}`, "PUT");

    if (!error) {
      Toast("success", "User confirmed successfully.");
      navigate("/");
    }
  };

  useEffect(() => {
    confirmEmail();
  }, []);

  useEffect(() => {
    if (error) {
      Toast("danger", error);
      clearError();
    }
  }, [error]);

  return (
    <Container component="main" className={classes.container}>
      <CircularProgress />
    </Container>
  );
};

export default ConfirmEmailPage;
