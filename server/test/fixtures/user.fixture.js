import { faker } from "@faker-js/faker";
import User from "../../models/User";

const fakeUser = ({
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName(),
  email = faker.internet.email(),
  password = "Admin123*",
} = {}) => ({
  firstName,
  lastName,
  email,
  password,
});

const instantiateUser = (firstName, lastName, email, password) =>
  new User(fakeUser(firstName, lastName, email, password));

export { instantiateUser, fakeUser };
