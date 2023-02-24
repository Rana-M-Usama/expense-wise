import { faker } from "@faker-js/faker";
import User from "../../models/User";

const UserFactory = ({
  firstName,
  lastName,
  email,
  password,
  isGoogleUser,
} = {}) =>
  new User({
    firstName: firstName || faker.lorem.word(5),
    lastName: lastName || faker.lorem.word(5),
    email: email || faker.internet.email(),
    isGoogleUser: isGoogleUser || false,
    password: isGoogleUser ? "" : password || "Admin123*",
  });

export default UserFactory;
