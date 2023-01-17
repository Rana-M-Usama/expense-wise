import { faker } from "@faker-js/faker";

import Sheet from "../../models/Sheet";
import UserFactory from "./user.factory";

const FAKER_STRING = faker.lorem.paragraphs(1);

const SheetFactory = ({ title, description, owner } = {}) =>
  new Sheet({
    title: title || FAKER_STRING.substring(0, 50),
    description: description || FAKER_STRING.substring(0, 100),
    owner: owner || UserFactory(),
  });

export default SheetFactory;
