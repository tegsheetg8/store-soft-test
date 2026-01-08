import "dotenv/config";
import { DataSource } from "typeorm";
import * as bcrypt from "bcrypt";
import { User, UserRole } from "../entities/user.entity";

async function seed() {
  // Support DATABASE_URL or individual PG* variables
  let config: any = {
    type: "postgres",
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    synchronize: false,
  };

  if (process.env.DATABASE_URL) {
    // Parse DATABASE_URL format: postgresql://user:password@host:port/database
    const url = new URL(process.env.DATABASE_URL);
    config.host = url.hostname;
    config.port = parseInt(url.port || "5432");
    config.username = url.username;
    config.password = url.password;
    config.database = url.pathname.slice(1); // Remove leading '/'
  } else {
    // Fall back to individual PG* environment variables
    config.host = process.env.PGHOST || process.env.DB_HOST || "localhost";
    config.port = parseInt(process.env.PGPORT || process.env.DB_PORT || "5432");
    config.username = process.env.PGUSER || process.env.DB_USERNAME || "postgres";
    config.password = process.env.PGPASSWORD || process.env.DB_PASSWORD || "postgres";
    config.database = process.env.PGDATABASE || process.env.DB_DATABASE || "pos_db";
  }

  const dataSource = new DataSource(config);

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
