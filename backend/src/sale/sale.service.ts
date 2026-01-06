import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, Between } from 'typeorm';
import { Sale } from '../entities/sale.entity';
import { SaleItem } from '../entities/sale-item.entity';
import { Product } from '../entities/product.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(SaleItem)
    private saleItemRepository: Repository<SaleItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private productService: ProductService,
    private dataSource: DataSource,
  ) {}

  async create(createSaleDto: CreateSaleDto, userId: number): Promise<Sale> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Calculate total
      const totalAmount = createSaleDto.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      );

      if (createSaleDto.paidAmount < totalAmount) {
        throw new BadRequestException('Paid amount is less than total amount');
      }

      const changeAmount = createSaleDto.paidAmount - totalAmount;

      // Create sale
      const sale = queryRunner.manager.create(Sale, {
        userId,
        totalAmount,
        paidAmount: createSaleDto.paidAmount,
        changeAmount,
      });
      const savedSale = await queryRunner.manager.save(sale);

      // Create sale items and update stock
      for (const item of createSaleDto.items) {
        const product = await this.productService.findOne(item.productId);
        
        if (Number(product.stock) < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for product ${product.name}. Available: ${product.stock}`,
          );
        }

        const saleItem = queryRunner.manager.create(SaleItem, {
          saleId: savedSale.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        });
        await queryRunner.manager.save(saleItem);

        // Decrease stock
        await this.productService.updateStock(item.productId, -item.quantity);
      }

      await queryRunner.commitTransaction();
      return this.findOne(savedSale.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Sale[]> {
    return this.saleRepository.find({
      relations: ['user', 'items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Sale> {
    const sale = await this.saleRepository.findOne({
      where: { id },
      relations: ['user', 'items', 'items.product', 'items.product.category', 'items.product.unit'],
    });
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
    return sale;
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Sale[]> {
    return this.saleRepository.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
      relations: ['user', 'items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }
}

