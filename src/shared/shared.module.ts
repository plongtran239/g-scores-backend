import { Global, Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';

import { CsvParserService } from 'src/shared/services/csv-parser.service';
import { PrismaService } from 'src/shared/services/prisma.service';

@Global()
@Module({
  imports: [CsvModule],
  providers: [PrismaService, CsvParserService],
  exports: [PrismaService, CsvParserService],
})
export class SharedModule {}
