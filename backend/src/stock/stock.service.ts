import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { StockIn } from '../entities/stock-in.entity';
import { StockInItem } from '../entities/stock-in-item.entity';
import { StockOut } from '../entities/stock-out.entity';
import { StockOutItem } from '../entities/stock-out-item.entity';
import { StockTaking } from '../entities/stock-taking.entity';
import { StockTakingItem } from '../entities/stock-taking-item.entity';
import { Product } from '../entities/product.entity';
import { CreateStockInDto } from './dto/create-stock-in.dto';
import { CreateStockOutDto } from './dto/create-stock-out.dto';
import { CreateStockTakingDto } from './dto/create-stock-taking.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockIn)
    private stockInRepository: Repository<StockIn>,
    @InjectRepository(StockInItem)
    private stockInItemRepository: Repository<StockInItem>,
    @InjectRepository(StockOut)
    private stockOutRepository: Repository<StockOut>,
    @InjectRepository(StockOutItem)
    private stockOutItemRepository: Repository<StockOutItem>,
    @InjectRepository(StockTaking)
    private stockTakingRepository: Repository<StockTaking>,
    @InjectRepository(StockTakingItem)
    private stockTakingItemRepository: Repository<StockTakingItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private productService: ProductService,
    private dataSource: DataSource,
  ) {}

  // Stock In
  async createStockIn(createStockInDto: CreateStockInDto): Promise<StockIn> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const totalAmount = createStockInDto.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      );

      const stockIn = queryRunner.manager.create(StockIn, {
        supplierId: createStockInDto.supplierId,
        totalAmount,
      });
      const savedStockIn = await queryRunner.manager.save(stockIn);

      const items = createStockInDto.items.map((item) =>
        queryRunner.manager.create(StockInItem, {
          stockInId: savedStockIn.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        }),
      );
      await queryRunner.manager.save(items);

      // Update product stock
      for (const item of createStockInDto.items) {
        await this.productService.updateStock(item.productId, item.quantity);
      }

      await queryRunner.commitTransaction();
      return this.findOneStockIn(savedStockIn.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAllStockIn(): Promise<StockIn[]> {
    return this.stockInRepository.find({
      relations: ['supplier', 'items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneStockIn(id: number): Promise<StockIn> {
    const stockIn = await this.stockInRepository.findOne({
      where: { id },
      relations: ['supplier', 'items', 'items.product'],
    });
    if (!stockIn) {
      throw new NotFoundException(`Stock In with ID ${id} not found`);
    }
    return stockIn;
  }

  // Stock Out
  async createStockOut(createStockOutDto: CreateStockOutDto): Promise<StockOut> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const stockOut = queryRunner.manager.create(StockOut, {
        reason: createStockOutDto.reason,
      });
      const savedStockOut = await queryRunner.manager.save(stockOut);

      const items = createStockOutDto.items.map((item) =>
        queryRunner.manager.create(StockOutItem, {
          stockOutId: savedStockOut.id,
          productId: item.productId,
          quantity: item.quantity,
        }),
      );
      await queryRunner.manager.save(items);

      // Update product stock (decrease)
      for (const item of createStockOutDto.items) {
        const product = await this.productService.findOne(item.productId);
        if (Number(product.stock) < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for product ${product.name}. Available: ${product.stock}`,
          );
        }
        await this.productService.updateStock(item.productId, -item.quantity);
      }

      await queryRunner.commitTransaction();
      return this.findOneStockOut(savedStockOut.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAllStockOut(): Promise<StockOut[]> {
    return this.stockOutRepository.find({
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneStockOut(id: number): Promise<StockOut> {
    const stockOut = await this.stockOutRepository.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });
    if (!stockOut) {
      throw new NotFoundException(`Stock Out with ID ${id} not found`);
    }
    return stockOut;
  }

  // Stock Taking
  async createStockTaking(createStockTakingDto: CreateStockTakingDto): Promise<StockTaking> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const stockTaking = queryRunner.manager.create(StockTaking, {
        note: createStockTakingDto.note,
      });
      const savedStockTaking = await queryRunner.manager.save(stockTaking);

      const items = await Promise.all(
        createStockTakingDto.items.map(async (item) => {
          const product = await this.productService.findOne(item.productId);
          const adjustment = item.realQty - Number(product.stock);

          return queryRunner.manager.create(StockTakingItem, {
            stockTakingId: savedStockTaking.id,
            productId: item.productId,
            systemQty: Number(product.stock),
            realQty: item.realQty,
          });
        }),
      );
      await queryRunner.manager.save(items);

      // Update product stock to real quantity
      for (const item of createStockTakingDto.items) {
        const product = await this.productService.findOne(item.productId);
        const adjustment = item.realQty - Number(product.stock);
        await this.productService.updateStock(item.productId, adjustment);
      }

      await queryRunner.commitTransaction();
      return this.findOneStockTaking(savedStockTaking.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAllStockTaking(): Promise<StockTaking[]> {
    return this.stockTakingRepository.find({
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneStockTaking(id: number): Promise<StockTaking> {
    const stockTaking = await this.stockTakingRepository.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });
    if (!stockTaking) {
      throw new NotFoundException(`Stock Taking with ID ${id} not found`);
    }
    return stockTaking;
  }
}

