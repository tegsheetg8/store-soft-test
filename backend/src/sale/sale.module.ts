import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { ReceiptService } from './receipt.service';
import { Sale } from '../entities/sale.entity';
import { SaleItem } from '../entities/sale-item.entity';
import { Product } from '../entities/product.entity';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, SaleItem, Product]),
    ProductModule,
  ],
  controllers: [SaleController],
  providers: [SaleService, ReceiptService],
  exports: [SaleService, ReceiptService],
})
export class SaleModule {}

