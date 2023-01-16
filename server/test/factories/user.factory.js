import { faker } from "@faker-js/faker";
import User from "../../models/User";

const UserFactory = (params = {}) => {
  const { firstName, lastName, email, password } = params;

  return new User({
    firstName: firstName || faker.name.firstName,
    lastName: lastName || faker.name.lastName,
    email: email || faker.internet.email(),
    password: password || "Admin123*",
  });
};

export default UserFactory;
