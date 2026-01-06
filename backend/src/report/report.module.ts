import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { Sale } from '../entities/sale.entity';
import { Product } from '../entities/product.entity';
import { SaleItem } from '../entities/sale-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Product, SaleItem])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}

