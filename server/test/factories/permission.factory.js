import SheetFactory from "./sheet.factory";
import UserFactory from "./user.factory";

import Permission from "../../models/Permission";
import { VIEW } from "../../constants/permission";

const PermissionFactory = ({ type, user, sheet } = {}) =>
  new Permission({
    type: type || VIEW,
    user: user || SheetFactory(),
    sheet: sheet || UserFactory(),
  });

export default PermissionFactory;
