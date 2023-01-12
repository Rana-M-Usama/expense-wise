import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";

import User from "../../models/User";

const password = "Admin123*";
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);
const user = {
  _id: mongoose.Types.ObjectId(),
  firstName: faker.lorem.word(20),
  lastName: faker.lorem.word(20),
  email: faker.internet.email().toLowerCase(),
  password,
};
const insertUsers = async (users) => {
  await User.insertMany(
    users.map((_user) => ({ ..._user, password: hashedPassword })),
  );
};

export { user, insertUsers };
