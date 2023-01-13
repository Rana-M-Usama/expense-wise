import { faker } from "@faker-js/faker";
import User from "../../models/User";

const generateUser = (firstName, lastName, email, password) =>
  new User({
    firstName: firstName || faker.name.firstName,
    lastName: lastName || faker.name.lastName,
    email: email || faker.internet.email(),
    password: password || "Admin123*",
  });

export default generateUser;
