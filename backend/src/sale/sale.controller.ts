import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { SaleService } from './sale.service';
import { ReceiptService } from './receipt.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('sales')
@UseGuards(JwtAuthGuard)
export class SaleController {
  constructor(
    private readonly saleService: SaleService,
    private readonly receiptService: ReceiptService,
  ) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto, @Request() req) {
    const sale = await this.saleService.create(createSaleDto, req.user.userId);
    return sale;
  }

  @Get()
  findAll(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    if (startDate && endDate) {
      return this.saleService.findByDateRange(new Date(startDate), new Date(endDate));
    }
    return this.saleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(+id);
  }

  @Get(':id/receipt')
  async getReceipt(@Param('id') id: string) {
    const sale = await this.saleService.findOne(+id);
    return this.receiptService.generateReceipt(sale);
  }
}

