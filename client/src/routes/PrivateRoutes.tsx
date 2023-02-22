import { Route, Routes } from "react-router-dom";
import React from "react";

import ExpenseSheet from "components/sheet/ExpenseSheet";
import PageNotFound from "components/PageNotFound";
import Permissions from "components/permissions/Permissions";
import ProfilePage from "pages/profile/profile.page";
import Sheets from "components/sheet/Sheets";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Sheets />} />
      <Route path="/sheets/:sheetId/expenses" element={<ExpenseSheet />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/sheets/:sheetId/permissions" element={<Permissions />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default PrivateRoutes;
