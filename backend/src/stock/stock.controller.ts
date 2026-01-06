import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockInDto } from './dto/create-stock-in.dto';
import { CreateStockOutDto } from './dto/create-stock-out.dto';
import { CreateStockTakingDto } from './dto/create-stock-taking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('stock')
@UseGuards(JwtAuthGuard)
export class StockController {
  constructor(private readonly stockService: StockService) {}

  // Stock In
  @Post('in')
  createStockIn(@Body() createStockInDto: CreateStockInDto) {
    return this.stockService.createStockIn(createStockInDto);
  }

  @Get('in')
  findAllStockIn() {
    return this.stockService.findAllStockIn();
  }

  @Get('in/:id')
  findOneStockIn(@Param('id') id: string) {
    return this.stockService.findOneStockIn(+id);
  }

  // Stock Out
  @Post('out')
  createStockOut(@Body() createStockOutDto: CreateStockOutDto) {
    return this.stockService.createStockOut(createStockOutDto);
  }

  @Get('out')
  findAllStockOut() {
    return this.stockService.findAllStockOut();
  }

  @Get('out/:id')
  findOneStockOut(@Param('id') id: string) {
    return this.stockService.findOneStockOut(+id);
  }

  // Stock Taking
  @Post('taking')
  createStockTaking(@Body() createStockTakingDto: CreateStockTakingDto) {
    return this.stockService.createStockTaking(createStockTakingDto);
  }

  @Get('taking')
  findAllStockTaking() {
    return this.stockService.findAllStockTaking();
  }

  @Get('taking/:id')
  findOneStockTaking(@Param('id') id: string) {
    return this.stockService.findOneStockTaking(+id);
  }
}

