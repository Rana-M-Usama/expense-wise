import { SheetFactory } from "./sheet.factory";
import UserFactory from "./user.factory";

import Permission from "../../models/Permission";
import { VIEW } from "../../constants/permission";

const PermissionFactory = ({ type, user, sheet } = {}) =>
  new Permission({
    type: type || VIEW,
    user: user || UserFactory(),
    sheet: sheet || SheetFactory(),
  });

const buildPermissionList = async (quantity, sheet) => {
  const permissions = await Promise.all(
    Array.from({ length: quantity }, () =>
      PermissionFactory({ user: UserFactory(), sheet }).save(),
    ),
  );

  return permissions;
};

export { buildPermissionList, PermissionFactory };
