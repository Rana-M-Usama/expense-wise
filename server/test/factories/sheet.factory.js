import { faker } from "@faker-js/faker";

import Sheet from "../../models/Sheet";
import UserFactory from "./user.factory";

const SheetFactory = ({ title, description, owner } = {}) =>
  new Sheet({
    title: title || faker.lorem.word(),
    description: description || faker.lorem.word(),
    owner: owner || UserFactory(),
  });

export default SheetFactory;
