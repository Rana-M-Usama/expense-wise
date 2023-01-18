import { faker } from "@faker-js/faker";

import Sheet from "../../models/Sheet";
import UserFactory from "./user.factory";

const FAKER_STRING =
  "RAI6hQ4lPq5HaS5JtK5A7LkLyLXruu9Z3No8y13oPfd9axC9gLJz4YZVnMDQkhZ9BPHp78khxUbEXqmoyE8mLdQrfGvrcOXmhct5cdA34jdAPsNcdLZIBnf4r1z8xbQphLE9xcKNXkhNa51It2eDwh";

const SheetFactory = ({ title, description, owner } = {}) =>
  new Sheet({
    title: title || FAKER_STRING.substring(0, 50),
    description: description || FAKER_STRING.substring(0, 100),
    owner: owner || UserFactory(),
  });

export default SheetFactory;
