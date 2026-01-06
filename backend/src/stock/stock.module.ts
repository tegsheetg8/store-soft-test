import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { StockIn } from '../entities/stock-in.entity';
import { StockInItem } from '../entities/stock-in-item.entity';
import { StockOut } from '../entities/stock-out.entity';
import { StockOutItem } from '../entities/stock-out-item.entity';
import { StockTaking } from '../entities/stock-taking.entity';
import { StockTakingItem } from '../entities/stock-taking-item.entity';
import { Product } from '../entities/product.entity';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StockIn,
      StockInItem,
      StockOut,
      StockOutItem,
      StockTaking,
      StockTakingItem,
      Product,
    ]),
    ProductModule,
  ],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService],
})
export class StockModule {}

