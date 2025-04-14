import { CsvParser } from 'nest-csv-parser';

import { CsvParserService } from 'src/shared/services/csv-parser.service';
import { PrismaService } from 'src/shared/services/prisma.service';

const cvsParserService = new CsvParserService(new CsvParser());
const prismaService = new PrismaService();

const seedScore = async () => {
  try {
    const dataCount = await prismaService.score.count();
    if (dataCount > 0) {
      throw new Error('Data already exists');
    }

    console.log('Parsing data...');
    const scores = await cvsParserService.parseCsv('data/diem_thi_thpt_2024.csv');
    console.log('Parsing data... done');

    if (!scores || scores.length === 0) {
      throw new Error('No score found!');
    }

    console.log('Seeding data...');
    const batchSize = 250;
    let insertedCount = 0;

    for (let i = 0; i < scores.length; i += batchSize) {
      const batch = scores.slice(i, i + batchSize);
      const batchData = batch.map((score) => ({
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
      }));

      await prismaService.score.createMany({
        data: batchData,
      });

      insertedCount += batch.length;

      if (insertedCount % 10000 === 0) {
        console.log(`Inserted ${insertedCount} scores`);
      }
    }

    console.log('Seeding data... done');
    console.log(`Total inserted: ${insertedCount} scores`);
  } catch (error) {
    console.error(error);
  } finally {
    console.log('Process completed');
  }
};

seedScore();
