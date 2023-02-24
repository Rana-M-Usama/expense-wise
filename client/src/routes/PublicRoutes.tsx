import { Route, Routes } from "react-router-dom";
import React from "react";

import LoginPage from "pages/login/login.page";
import PageNotFound from "components/PageNotFound";
import ResetPasswordPage from "pages/resetpassword/resetpassword.page";
import SignupPage from "pages/signup/signup.page";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/forget-password/:resetToken"
        element={<ResetPasswordPage />}
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
