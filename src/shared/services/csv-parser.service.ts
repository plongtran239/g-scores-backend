import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { CsvParser } from 'nest-csv-parser';

import { CsvScoreDTO } from 'src/shared/dtos/score.dto';
import { CsvScoreType } from 'src/shared/models/shared-score.model';

@Injectable()
export class CsvParserService {
  constructor(private readonly csvParser: CsvParser) {}

  async parseCsv(filePath: string): Promise<CsvScoreType[] | undefined> {
    const stream = fs.createReadStream(filePath);

    try {
      const parsedData = await this.csvParser.parse(stream, CsvScoreDTO, undefined, undefined, {
        strict: true,
        separator: ',',
      });

      return parsedData.list as CsvScoreType[];
    } catch {
      throw new Error('Cannot parse CSV file');
    }
  }
}
