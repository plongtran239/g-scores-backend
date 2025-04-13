import { Module } from '@nestjs/common';

import { ReportController } from 'src/modules/report/report.controller';
import { ReportService } from 'src/modules/report/report.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
