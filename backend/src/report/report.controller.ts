import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('sales')
  getSalesReport(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const start = startDate ? new Date(startDate) : new Date(new Date().setHours(0, 0, 0, 0));
    const end = endDate ? new Date(endDate) : new Date();
    return this.reportService.getSalesReport(start, end);
  }

  @Get('stock-balance')
  getStockBalanceReport() {
    return this.reportService.getStockBalanceReport();
  }

  @Get('low-stock')
  getLowStockReport() {
    return this.reportService.getLowStockReport();
  }
}

