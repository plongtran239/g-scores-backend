import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { CsvParser } from 'nest-csv-parser';

import { CsvScoreDTO } from 'src/shared/dtos/score.dto';

@Injectable()
export class CsvParserService {
  constructor(private readonly csvParser: CsvParser) {}

  async parseCsv(filePath: string): Promise<CsvScoreDTO[] | undefined> {
    const stream = fs.createReadStream(filePath);

    const parsedData = await this.csvParser.parse(stream, CsvScoreDTO, undefined, undefined, {
      strict: true,
      separator: ',',
    });

    return parsedData.list as CsvScoreDTO[];
  }
}
