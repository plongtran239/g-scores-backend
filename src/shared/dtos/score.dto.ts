import { createZodDto } from 'nestjs-zod';

import { CsvScoreSchema, ScoreSchema } from 'src/shared/models/shared-score.model';

export class ScoreDTO extends createZodDto(ScoreSchema) {}

export class CsvScoreDTO extends createZodDto(CsvScoreSchema) {}
