import { faker } from "@faker-js/faker";

const PASSWORD = "Admin123*";
const FAKER_STRING = faker.lorem.paragraphs(1);

const generateUser = (firstName, lastName, email, password) => ({
  firstName: firstName || FAKER_STRING.substring(0, 20),
  lastName: lastName || FAKER_STRING.substring(0, 20),
  email: email || faker.internet.email(),
  password: password || PASSWORD,
});

export default generateUser;
