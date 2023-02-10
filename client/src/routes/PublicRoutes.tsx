import { Route, Routes } from "react-router-dom";
import React from "react";

import LoginPage from "pages/login/login.page";
import ResetPasswordPage from "pages/resetpassword/resetpassword.page";
import SignupPage from "pages/signup/signup.page";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};

export default PublicRoutes;
