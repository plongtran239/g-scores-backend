import { CsvParser } from 'nest-csv-parser';

import { CsvParserService } from 'src/shared/services/csv-parser.service';
import { PrismaService } from 'src/shared/services/prisma.service';

const cvsParserService = new CsvParserService(new CsvParser());
const prismaService = new PrismaService();

const seedScore = async () => {
  const dataCount = await prismaService.score.count();

  if (dataCount > 0) {
    throw new Error('Data already exists');
  }

  console.log('Parsing data...');
  const scores = await cvsParserService.parseCsv('data/diem_thi_thpt_2024.csv');
  console.log('Parsing data... done');

  if (!scores) {
    throw new Error('No score found!');
  }

  console.log('Seeding data...');

  let insertedCount = 0;
  for (const score of scores) {
    await prismaService.score.create({
      data: {
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
      },
    });
    insertedCount++;

    if (insertedCount % 50000 === 0) {
      console.log(`Inserted ${insertedCount} scores`);
    }
  }

  console.log('Seeding data... done');

  console.log(`Total inserted: ${insertedCount} scores`);

  process.exit(0);
};

seedScore();
