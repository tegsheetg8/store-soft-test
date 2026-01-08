import "dotenv/config";
import { DataSource } from "typeorm";
import * as bcrypt from "bcrypt";
import { User, UserRole } from "../entities/user.entity";

async function seed() {
  const dataSource = new DataSource({
    type: "postgres",
    host: process.env.PGHOST || "localhost",
    port: parseInt(process.env.PGPORT || "5432"),
    username: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "postgres",
    database: process.env.PGDATABASE || "pos_db",
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
