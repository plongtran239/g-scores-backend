import { CsvParser } from 'nest-csv-parser';

import { CsvParserService } from 'src/shared/services/csv-parser.service';
import { PrismaService } from 'src/shared/services/prisma.service';

const cvsParserService = new CsvParserService(new CsvParser());
const prismaService = new PrismaService();

const insertRemainingScores = async () => {
  console.log('Parsing data...');
  const scores = await cvsParserService.parseCsv('data/diem_thi_thpt_2024.csv');
  console.log('Parsing data... done');

  const scoreCount = await prismaService.score.count();

  if (!scores || scores.length === 0) {
    throw new Error('No score found!');
  }

  const batchSize = 100;
  const remainingScores = scores.slice(scoreCount);

  let insertedCount = 0;

  for (let i = 0; i < remainingScores.length; i += batchSize) {
    const batch = remainingScores.slice(i, i + batchSize);
    try {
      await prismaService.score.createMany({
        data: batch.map((score) => ({
          id: parseInt(score.sbd),
          math: parseFloat(score.toan),
          literature: parseFloat(score.ngu_van),
          foreignLanguage: parseFloat(score.ngoai_ngu),
          physics: parseFloat(score.vat_li),
          chemistry: parseFloat(score.hoa_hoc),
          biology: parseFloat(score.sinh_hoc),
          history: parseFloat(score.lich_su),
          geography: parseFloat(score.dia_li),
          civics: parseFloat(score.gdcd),
          foreignLanguageCode: score.ma_ngoai_ngu,
        })),
      });
      insertedCount += batch.length;

      if (insertedCount % 10000 === 0) {
        console.log(`Inserted ${insertedCount} scores`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  console.log(`Total inserted: ${insertedCount} scores`);
};

insertRemainingScores();
