import { faker } from "@faker-js/faker";

import Sheet from "../../models/Sheet";
import UserFactory from "./user.factory";

const SheetFactory = ({ title, description, owner } = {}) =>
  new Sheet({
    title: title || faker.lorem.word(),
    description: description || faker.lorem.word(),
    owner: owner || UserFactory(),
  });

const buildSheetList = async (totalCount, owner) => {
  for (let i = 1; i <= totalCount; i++) {
    await SheetFactory({ owner }).save();
  }
};

export { buildSheetList, SheetFactory };
