import { Global, Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';

import { SharedScoreRepository } from 'src/shared/repositories/shared-score.repository';
import { CsvParserService } from 'src/shared/services/csv-parser.service';
import { PrismaService } from 'src/shared/services/prisma.service';

@Global()
@Module({
  imports: [CsvModule],
  providers: [PrismaService, CsvParserService, SharedScoreRepository],
  exports: [PrismaService, CsvParserService, SharedScoreRepository],
})
export class SharedModule {}
