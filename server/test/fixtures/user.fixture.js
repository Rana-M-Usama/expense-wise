// eslint-disable-next-line node/no-unpublished-import
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../../models/User";

const password = "123456";
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  _id: mongoose.Types.ObjectId(),
  firstName: faker.name.fullName(),
  lastName: faker.name.fullName(),
  email: faker.internet.email().toLowerCase(),
  password,
};

const insertUsers = async (users) => {
  await User.insertMany(
    users.map((user) => ({ ...user, password: hashedPassword })),
  );
};

export { userOne, insertUsers };
