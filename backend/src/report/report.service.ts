import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual } from 'typeorm';
import { Sale } from '../entities/sale.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getSalesReport(startDate: Date, endDate: Date) {
    const sales = await this.saleRepository.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
      relations: ['user', 'items', 'items.product'],
      order: { createdAt: 'DESC' },
    });

    const totalSales = sales.reduce((sum, sale) => sum + Number(sale.totalAmount), 0);
    const totalTransactions = sales.length;

    return {
      startDate,
      endDate,
      totalSales,
      totalTransactions,
      sales,
    };
  }

  async getStockBalanceReport() {
    const products = await this.productRepository.find({
      relations: ['category', 'unit'],
      order: { name: 'ASC' },
    });

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category.name,
      unit: product.unit.shortName,
      stock: Number(product.stock),
      minStock: Number(product.minStock),
      status: Number(product.stock) <= Number(product.minStock) ? 'LOW' : 'OK',
    }));
  }

  async getLowStockReport() {
    const products = await this.productRepository.find({
      relations: ['category', 'unit'],
      where: {
        stock: LessThanOrEqual(0),
      },
    });

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category.name,
      unit: product.unit.shortName,
      stock: Number(product.stock),
      minStock: Number(product.minStock),
    }));
  }
}

