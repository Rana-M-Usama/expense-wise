import { Route, Routes } from "react-router-dom";
import React from "react";

import About from "components/about/About";
import ExpenseSheet from "components/sheet/ExpenseSheet";
import Permissions from "components/permissions/Permissions";
import ProfilePage from "pages/profile/profile.page";
import Sheets from "components/sheet/Sheets";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Sheets />} />
      <Route path="/sheets" element={<Sheets />} />
      <Route path="/expenses" element={<ExpenseSheet />} />
      <Route path="/permissions" element={<Permissions />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};

export default PrivateRoutes;
