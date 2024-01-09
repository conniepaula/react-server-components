import { prisma } from "../src/lib/prisma";
import { faker } from "@faker-js/faker";

faker.seed(123);

async function main() {
  for (let i = 0; i < 1000; i++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email(firstName, lastName),
      },
    });
  }
}
