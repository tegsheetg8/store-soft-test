import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { UnitModule } from './unit/unit.module';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { StockModule } from './stock/stock.module';
import { SaleModule } from './sale/sale.module';
import { ReportModule } from './report/report.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // Support DATABASE_URL or individual PG* variables
        const databaseUrl = configService.get('DATABASE_URL');
        if (databaseUrl) {
          // Parse DATABASE_URL format: postgresql://user:password@host:port/database
          const url = new URL(databaseUrl);
          return {
            type: 'postgres',
            host: url.hostname,
            port: parseInt(url.port || '5432'),
            username: url.username,
            password: url.password,
            database: url.pathname.slice(1), // Remove leading '/'
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: configService.get('NODE_ENV') === 'development',
            logging: configService.get('NODE_ENV') === 'development',
          };
        }
        
        // Fall back to individual PG* environment variables
        return {
          type: 'postgres',
          host: configService.get('PGHOST', configService.get('DB_HOST', 'localhost')),
          port: configService.get<number>('PGPORT', configService.get<number>('DB_PORT', 5432)),
          username: configService.get('PGUSER', configService.get('DB_USERNAME', 'postgres')),
          password: configService.get('PGPASSWORD', configService.get('DB_PASSWORD', 'postgres')),
          database: configService.get('PGDATABASE', configService.get('DB_DATABASE', 'pos_db')),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: configService.get('NODE_ENV') === 'development',
          logging: configService.get('NODE_ENV') === 'development',
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    UnitModule,
    ProductModule,
    SupplierModule,
    StockModule,
    SaleModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

