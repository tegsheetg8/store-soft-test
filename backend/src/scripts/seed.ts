import "dotenv/config";
import { DataSource } from "typeorm";
import * as bcrypt from "bcrypt";
import { User, UserRole } from "../entities/user.entity";

async function seed() {
  const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_DATABASE || "pos_db",
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    synchronize: false,
  });

  await dataSource.initialize();

  const userRepository = dataSource.getRepository(User);

  // Create admin user
  const adminExists = await userRepository.findOne({
    where: { username: "admin" },
  });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = userRepository.create({
      username: "admin",
      password: hashedPassword,
      role: UserRole.ADMIN,
      isActive: true,
    });
    await userRepository.save(admin);
    console.log("Admin user created: username=admin, password=admin123");
  } else {
    console.log("Admin user already exists");
  }

  // Create cashier user
  const cashierExists = await userRepository.findOne({
    where: { username: "cashier" },
  });
  if (!cashierExists) {
    const hashedPassword = await bcrypt.hash("cashier123", 10);
    const cashier = userRepository.create({
      username: "cashier",
      password: hashedPassword,
      role: UserRole.CASHIER,
      isActive: true,
    });
    await userRepository.save(cashier);
    console.log("Cashier user created: username=cashier, password=cashier123");
  } else {
    console.log("Cashier user already exists");
  }

  await dataSource.destroy();
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
