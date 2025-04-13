import { Controller, Get } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';

import { GetStatisticsResponseDTO, GetTopGroupAResponseDTO } from 'src/modules/report/report.dto';
import { ReportService } from 'src/modules/report/report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('statistics')
  @ZodSerializerDto(GetStatisticsResponseDTO)
  public async getStatistics() {
    return await this.reportService.getStatistics();
  }

  @Get('top-group-a')
  @ZodSerializerDto(GetTopGroupAResponseDTO)
  public async getTopGroupA() {
    return await this.reportService.getTopGroupA();
  }

  @Get('dashboard')
  public async getDashboard() {
    return await this.reportService.getDashboard();
  }
}
